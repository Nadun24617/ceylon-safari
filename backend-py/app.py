from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load trained model
model = joblib.load(r"C:\Users\thanu\ceylon-safari\backend-py\newtravelmodel-checkpoint.pkl")

# Destination data dictionary
DESTINATION_INFO = {
    "beaches": [
        {"name": "Unawatuna", "location": "Galle", "description": "Snorkeling & calm waters"},
        {"name": "Mirissa", "location": "Matara", "description": "Whale watching & surfing"},
        {"name": "Nilaveli", "location": "Trincomalee", "description": "Peaceful white sand beach"}
    ],
    "mountains": [
        {"name": "Ella", "location": "Badulla", "description": "Scenic hiking & nature"},
        {"name": "Haputale", "location": "Uva", "description": "Cloud forests & views"},
        {"name": "Knuckles Range", "location": "Matale", "description": "Biodiversity hotspot"}
    ],
    "cities": [
        {"name": "Colombo", "location": "Western Province", "description": "Shopping, nightlife, and urban culture"},
        {"name": "Kandy", "location": "Central Province", "description": "Cultural heritage and lakeside views"},
        {"name": "Galle", "location": "Southern Province", "description": "Colonial charm & the Galle Fort"}
    ],
    "nature": [
        {"name": "Sinharaja Forest", "location": "Southwest", "description": "UNESCO rainforest"},
        {"name": "Yala National Park", "location": "Southeast", "description": "Wildlife safari"},
        {"name": "Horton Plains", "location": "Nuwara Eliya", "description": "World’s End & grasslands"}
    ],
    "adventure": [
        {"name": "Kitulgala", "location": "Sabaragamuwa", "description": "White-water rafting"},
        {"name": "Arugam Bay", "location": "East Coast", "description": "Surfing paradise"},
        {"name": "Knuckles Trek", "location": "Central", "description": "Challenging hiking trails"}
    ]
}

@app.route('/')
def home():
    return "✅ API is running", 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        required_fields = [
            'age_group', 'gender', 'employment_status', 'country_of_residence',
            'occupation', 'transport_modes', 'accommodation_type', 'travel_budget',
            'booking_method', 'travel_apps_used', 'interested_in_new_app',
            'features_liked', 'challenges', 'trip_satisfaction_level'
        ]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing one or more required fields."}), 400

        input_df = pd.DataFrame([data])
        prediction = model.predict(input_df)

        # Normalize prediction
        label_map = {
            "beach": "beaches",
            "mountain": "mountains",
            "city": "cities",
            "nature": "nature",
            "adventure": "adventure"
        }
        result = label_map.get(prediction[0].lower(), prediction[0].lower())

        response = {"recommended_destination": result}

        # Add detailed places if available
        if result in DESTINATION_INFO:
            response["places"] = DESTINATION_INFO[result]

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/places/<category>', methods=['GET'])
def get_places(category):
    category = category.lower()
    if category in DESTINATION_INFO:
        return jsonify(DESTINATION_INFO[category])
    else:
        return jsonify({"error": f"No data found for category '{category}'."}), 404

if __name__ == '__main__':
    app.run(port=5000, debug=True)
