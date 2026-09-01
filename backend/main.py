import os
import shutil
import asyncio
from fastapi import FastAPI, UploadFile, File, Form
from ai_engine import enhance_product_image, generate_catalog_and_pricing

app = FastAPI(title="Artisan AI Backend")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/process-product/")
async def process_product(
    file: UploadFile = File(...),
    voice_description: str = Form(...)
):
    input_path = os.path.join(UPLOAD_DIR, file.filename)
    output_path = os.path.join(UPLOAD_DIR, f"enhanced_{file.filename}")
    
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Run heavy AI image processing off the main thread to prevent hanging
    await asyncio.to_thread(enhance_product_image, input_path, output_path)
    
    # Run cataloging engine
    ai_results = await asyncio.to_thread(generate_catalog_and_pricing, voice_description)
    
    return {
        "status": "success",
        "enhanced_image_url": f"/uploads/enhanced_{file.filename}",
        "ai_insights": ai_results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)