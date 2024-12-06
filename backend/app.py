from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Load the YOLO model
model = YOLO("best1.pt")

@app.route('/predict', methods=['POST'])
def predict():
    # Check if files are present in the request
    if 'files' not in request.files:
        return jsonify({"error": "No files uploaded"}), 400

    files = request.files.getlist('files')  # For multiple file uploads
    if not files:
        return jsonify({"error": "No files selected"}), 400

    results = []  # To store results for all files
    for file in files:
        try:
            np_img = np.frombuffer(file.read(), np.uint8)
            img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

            # Predict using the YOLO model
            result = model.predict(source=img, save=False, show=False)

            # Extract labels from the prediction
            labels = [model.names[int(cls)] for cls in result[0].boxes.cls]

            # Annotate the image
            annotated_image = result[0].plot()

            # Convert annotated image to base64
            _, buffer = cv2.imencode('.png', annotated_image)
            image_base64 = base64.b64encode(buffer).decode('utf-8')

            # Append result for this file
            results.append({
                "file": file.filename,
                "labels": labels,
                "image": image_base64
            })
        except Exception as e:
            # Handle exceptions for each file
            results.append({
                "error": f"Error processing file {file.filename}: {str(e)}"
            })

    # Return all results in one response
    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(debug=True)


