import streamlit as st
from ultralytics import YOLO
import matplotlib.pyplot as plt
import cv2
from PIL import Image
import numpy as np

# Load the YOLOv8 model
model = YOLO("s_best.pt")  # Replace with your model's path

# Streamlit App
st.title("YOLOv8 Segmentation")

# File uploader
uploaded_image = st.file_uploader("Upload an image...", type=["jpg", "jpeg", "png"])

if uploaded_image is not None:
    # Load the image with PIL
    image = Image.open(uploaded_image)
    
    # Display the uploaded image
    st.image(image, caption='Uploaded Image', use_column_width=True)

    # Convert the image to a format YOLOv8 can work with (numpy array)
    image_np = np.array(image)

    # Perform prediction
    st.write("Running segmentation...")
    results = model.predict(source=image_np, save=True, show=False)

    # Get the first image from the results (assuming only one image was processed)
    segmented_image = results[0].plot()

    # Convert BGR (OpenCV format) to RGB for displaying with Matplotlib
    # segmented_image_rgb = cv2.cvtColor(segmented_image, cv2.COLOR_BGR2RGB)

    # Display the segmented image using Matplotlib and Streamlit
    st.write("Segmented Output:")
    st.image(segmented_image, caption='Segmented Image', use_column_width=True)

    # Optionally, you can display detailed results (bounding boxes, class info, etc.)
    st.write("Detection Details:")
# Display detection details with proper formatting
    for box in results[0].boxes:
        st.write(f"Class: {model.names[int(box.cls)]}, Confidence: {float(box.conf):.2f}")
