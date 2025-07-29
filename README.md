[Uploading README.md…]()
This project is a Flask-based dashboard that visualizes the transition from diesel buses to electric buses in Indonesia between 2025 and 2045. It processes a dataset and presents key emission trends and reductions.

Project Overview
Backend (app.py):

Built using Flask.

Responsible for reading the dataset (Indonesia_Bus_Emissions_Projection_2010_2045.csv).

Provides API endpoints that supply diesel bus data, EV bus data, emissions, and city-level statistics to the frontend.

Frontend (index.html):

Designs the basic layout of the dashboard page.

Loads JavaScript files and connects to API endpoints for dynamic data visualization.

Frontend Interaction (JavaScript):

Sends AJAX requests to Flask API endpoints.

Receives data and uses libraries like ECharts or plain JavaScript to render dynamic charts and tables.

Handles user interactions such as selecting a year, switching views, or loading maps

check the requiremnets !!!!!!!!!
