
import { getModel } from "../config/llmModels.js";
import { generatePdf } from "../utils/generatePdf.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const pdfAgent = async (state) => {
  let stage = "initialization";

  try {
    stage = "checking agent limit";
    await checkAgentLimit(state.userId, "pdf");

    stage = "loading LLM model";
    const llm = await getModel("pdf");

    stage = "generating document content";

    const prompt = `
You are an expert document writer.

Return ONLY valid JSON.
Do NOT return markdown or explanations.

Use this exact structure:
{
  "title": "",
  "subtitle": "",
  "sections": [
    {
      "heading": "",
      "points": []
    }
  ]
}

Generate 4-8 sections.
Each section should have 3-6 concise bullet points.

Topic:
${state.prompt}
`;

    const res = await llm.invoke(prompt);

    stage = "parsing LLM response";

    let content = res.content;

    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }

    content = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(content);

    if (
      !data.title ||
      !Array.isArray(data.sections) ||
      data.sections.length === 0
    ) {
      throw new Error("LLM returned invalid PDF document structure");
    }

    stage = "generating PDF";
    const pdfBuffer = await generatePdf(data);

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error("Generated PDF buffer is empty");
    }

    stage = "uploading PDF to S3";

    const filename = `pdf-${Date.now()}.pdf`;

    await uploadToS3(
      filename,
      pdfBuffer,
      "application/pdf"
    );

    stage = "generating download URL";

    const downloadUrl = await getFromS3(filename, 10 * 60);

    if (!downloadUrl) {
      throw new Error("Failed to generate PDF download URL");
    }

    stage = "deducting credits";
    await deductCredits(state.userId, "pdf");

    console.log("PDF generated successfully:", filename);

    return {
      ...state,
      aiResponse: `# PDF Generated

**${data.title}**

📥 [Download PDF](${downloadUrl})

_Link expires in 10 minutes._`,
    };

  } catch (error) {
    console.error(`PDF Agent failed at stage: ${stage}`);
    console.error(error);

    return {
      ...state,
      aiResponse: `PDF generation failed at stage: ${stage}. ${error.message || "Unknown error"}`,
    };
  }
};
