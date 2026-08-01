from query_functions import add_player_query, player_progress_id_query, fetch_player_progress_query, \
    update_progress_query, fetch_riddle_query, \
    fetch_quiz_questions_query, fetch_game_airports_query, delete_player_and_progress_query, fetch_airport_info_query, \
    fetch_airport_country_query
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/player/<text>')
def player(text):
    try:
        player_name = text.upper()
        player_id = add_player_query(player_name)
        print(player_id)

        if player_id:
            player_progress_id_query(player_id)

        player_progress_data = fetch_player_progress_query(player_id)
        print(player_progress_data)

        collectibles = json.loads(player_progress_data[6]) if player_progress_data and player_progress_data[6] else []

        response = {
            "name": player_name,
            "progressId": player_progress_data[0],
            "playerId": player_progress_data[1],
            "level": player_progress_data[2],
            "score": player_progress_data[3],
            "carbonPrint": player_progress_data[4],
            "attempts": player_progress_data[5],
            "collectibles": collectibles
        }

        return response

    except ValueError:
        response = {
            "message": "Invalid text",
            "status": 400
        }
        json_response = json.dumps(response)
        http_response = Response(response=json_response, status=400, mimetype="application/json")
        return http_response


@app.route('/progress/player_id')
def progress(player_id):
    try:
        player_data = fetch_player_progress_query(player_id)

        print(player_data)

        collectibles = json.loads(player_data[6]) if player_data and player_data[6] else []
        response = {
            "progressId": player_data[0],
            "playerId": player_data[1],
            "level": player_data[2],
            "score": player_data[3],
            "carbonPrint": player_data[4],
            "attempts": player_data[5],
            "collectibles": collectibles
        }

        return response

    except ValueError:
        response = {
            "message": "Invalid text",
            "status": 400
        }
        json_response = json.dumps(response)
        http_response = Response(response=json_response, status=400, mimetype="application/json")
        return http_response

@app.route('/update/progress', methods=["POST"])
def update_progress():
    data = request.get_json(silent=True)
    print(data)
    if not data:
        return jsonify({"error": "Request body must be valid JSON"}), 400

    missing = [f for f in ("level", "score", "carbon_fp", "player_id", "collectibles") if f not in data]
    print("missing", missing)
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    player_progress_update =  update_progress_query(
            data["level"],
            data["score"],
            data["carbon_fp"],
            data["player_id"],
            data["attempts"],
            data["collectibles"]
    )
    print("player_progress/collection_update")

    response = player_progress_update
    return response


@app.route('/riddles')
def riddles():
    all_riddles = fetch_riddle_query()
    print(all_riddles)
    response = all_riddles

    return response


@app.route('/quiz/questions')
def questions():
    all_questions = fetch_quiz_questions_query()
    print(all_questions)
    response = all_questions

    return response


@app.route('/airports/icao')
def airports_icao():
    game_airports = fetch_game_airports_query()
    print(game_airports)
    response = game_airports
    return response


@app.route('/airportDetail/<icao_list>')
def airports_details(icao_list):
    icao_codes = icao_list.split(',')

    results = []

    for icao in icao_codes:
        icao = icao.strip()
        airport_info = fetch_airport_info_query(icao)

        if not airport_info:
            results.append({"icao": icao, "error": "not found"})
            continue

        airport_country = fetch_airport_country_query(airport_info[0])

        # [iso_country, ident, name(airport), latitude_deg, longitude_deg, name(country)]

        results.append({
            "airportName": airport_info[2],
            "country": airport_country[0],
            "lat": airport_info[3],
            "lon": airport_info[4],
            "isoCountry": airport_info[0],
            "icao": airport_info[1],
        })

    return {"airports": results}


@app.route('/quit')
def remove_player():
    delete_confirmation = delete_player_and_progress_query()
    print(delete_confirmation)
    response = delete_confirmation
    return response


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)
