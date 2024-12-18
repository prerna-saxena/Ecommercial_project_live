import fitz  # PyMuPDF
import openai

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    document_text = ""
    with fitz.open(pdf_path) as doc:
        for page_num in range(doc.page_count):
            page = doc[page_num]
            document_text += page.get_text()
    return document_text

# Function to extract relevant sections using OpenAI API
def summarize_for_investors(text, api_key):
    # Set up OpenAI API
    openai.api_key = api_key
    # Prompt to filter out relevant investor information
    prompt = (f"Extract key information for an investor assessing the company's "
              f"future growth, changes in business, key earnings triggers, and "
              f"factors likely impacting next year's earnings and growth:\n\n{text}")
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=500,
        temperature=0.2
    )
    return response.choices[0].text.strip()

# Main function to process the PDF and extract relevant information
def process_earnings_transcript(pdf_path, api_key):
    # Extract full text from PDF
    document_text = extract_text_from_pdf(pdf_path)
    # Use OpenAI to summarize relevant information
    investor_info = summarize_for_investors(document_text, api_key)
    return investor_info

# Run the extraction on the provided PDF
pdf_path = "/mnt/data/SJS Transcript Call.pdf"
api_key = "your_openai_api_key_here"  # Replace with your actual OpenAI API key

# Process the document and get summarized insights
investor_summary = process_earnings_transcript(pdf_path, api_key)
print("Investor-Focused Summary:\n", investor_summary)
