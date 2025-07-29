from flask import Flask, render_template, jsonify, request
import random
import pandas as pd

# Load dataset
file_path = "Indonesia_Bus_Emissions_Projection_2010_2045.csv"
df = pd.read_csv(file_path)

# Define target years
years = [str(year) for year in range(2025, 2046)]

# Extract data for Diesel and EVs
filtered_df = df[df["Year"].isin(range(2025, 2046))]
diesel_buses = filtered_df.set_index("Year").loc[range(2025, 2046), "Diesel Buses"].astype(int).tolist()
ev_buses = filtered_df.set_index("Year").loc[range(2025, 2046), "Electric Buses"].astype(int).tolist()
Diesel_emissions = filtered_df.set_index("Year").loc[range(2025, 2046), "Diesel Emissions (Mt CO2)"].astype(int).tolist()
EV_emissions = filtered_df.set_index("Year").loc[range(2025, 2046), "Electric Emissions (Mt CO2)"].astype(int).tolist()

# Emission totals and reduction values
total_emissons = ['26691.3', '26423.6', '26162.2', '25907.5', '25659.5', '25418.3', '25183.9', '24956.7', '24736.5', '24523.6',
                  '24318.1', '24119.9', '23593.7', '22904', '22214.3', '21524.6', '20834.9', '20145.3', '19455.5', '18765.9', '18076.2']
total_emissons_reduction = ['274.1', '541.8', '803.2', '1057.9', '1305.9', '1547.1', '1781.5', '2008.7', '2228.9', '2441.8',
                             '2647.3', '2845.5', '3371.7', '4061.4', '4751.1', '5440.8', '6130.5', '6820.1', '7509.9', '8199.5', '8889.2']

# Initialize Flask app
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


# Render main page
@app.route('/')
def index():
    return render_template('index.html')


# Provide EV/Diesel data for selected year
@app.route('/l1')
def get_l1_data():
    year = request.args.get('year')
    if not year:
        return jsonify({"error": "Missing year"}), 400

    if int(year) not in df["Year"].values:
        return jsonify({"error": "Year not found"}), 404

    row = df[df["Year"] == int(year)].iloc[0]

    return jsonify({
        "EV_count": int(row["Electric Buses"]),
        "Diesel_count": int(row["Diesel Buses"]),
        "EV_emissions": float(row["Electric Emissions (Mt CO2)"]),
        "Diesel_emissions": float(row["Diesel Emissions (Mt CO2)"])
    })


# Provide static DV/EV performance data
@app.route('/l2')
def get_l2_data():
    Diesel = [120030, 2020, 51, 2.2, 10.6]
    EV = [29023, 576, 48, 1.3, 8.9]
    return jsonify({"EV": EV, "Diesel": Diesel})


# Provide yearly Diesel and EV vehicle numbers
@app.route('/l3')
def get_l3_data():
    index = years
    Diesel = diesel_buses
    EV = ev_buses
    return jsonify({"index": index, "new_customer": EV, "old_customer": Diesel})


# Provide monthly and yearly CO2 reduction data
@app.route('/c1')
def get_c1_data():
    target = 3000000
    sales = ['23.89', '23.38', '22.85', '22.31', '21.78', '21.23', '20.67', '20.10', '19.53', '18.98',
             '18.34', '17.75', '17.13', '16.51', '43.86', '57.48', '57.48', '57.47', '57.48', '57.47']
    achieving_rate = "0%"  # Placeholder because sales is a list, needs real calc if necessary

    year_target = 40000000
    year_sales = ['286.7', '280.5', '274.2', '267.7', '261.4', '254.7', '248.0', '241.2', '234.3', '227.8',
                  '220.1', '213.0', '205.5', '198.1', '526.3', '689.7', '689.7', '689.6', '689.8', '689.6']
    year_achieving_rate = "0%"  # Same reason

    return jsonify({
        "month_Reduction": sales,
        "target": target,
        "achieving_rate": achieving_rate,
        "year_Reduction": year_sales,
        "year_target": year_target,
        "year_achieving_rate": year_achieving_rate
    })


# Provide random city map data
@app.route('/map')
def get_map_data():
    city_list = [
        'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Semarang', 'Palembang', 'Tangerang', 'Batam', 'Depok',
        'Bekasi', 'Yogyakarta', 'Malang', 'Manado', 'Makasar', 'Padang', 'Bogor', 'Pontianak', 'Jambi', 'Banjarmasin',
        'Ambon', 'Mataram', 'Samarinda', 'Cirebon', 'Surakarta', 'Tasikmalaya', 'Sukabumi', 'Kupang', 'Balikpapan',
        'Pekanbaru', 'Manado', 'Cilegon', 'Padang', 'Batam', 'Ternate', 'Bali', 'Nusa Tenggara', 'Ciputat', 'Sidoarjo',
        'Palangkaraya', 'Lhokseumawe', 'Bengkulu', 'Samarinda', 'Jambi', 'Singaraja', 'Bandar Lampung', 'Mamuju',
        'Gorontalo', 'Banjarmasin', 'Palu', 'Pekanbaru', 'Surabaya', 'Yogyakarta', 'Bengkulu', 'Mataram', 'Kendari',
        'Cilegon', 'Mojokerto'
    ]
    data = [{'name': city, 'value': random.randint(10, 100)} for city in city_list]
    return jsonify({"data": data})


# Provide prediction data for CO2 emissions
@app.route('/r1')
def get_r1_data():
    index = years
    sales = total_emissons
    profit = total_emissons_reduction
    rate = ['1.03', '2.05', '3.07', '4.08', '5.09', '6.09', '7.07', '8.05', '9.01', '9.96',
            '10.89', '11.80', '14.29', '17.73', '21.39', '25.28', '29.42', '33.85', '38.60', '43.69', '49.18']
    return jsonify({"index": index, "sales": sales, "profit": profit, "profit_rate": rate})


if __name__ == '__main__':
    app.run()
