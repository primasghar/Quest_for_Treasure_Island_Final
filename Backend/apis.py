from http.client import responses

from query_functions import add_player_query, player_progress_id_query, fetch_player_progress_query, fetch_riddle_query
from flask import Flask, Response
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

        response = {
            "name": player_name,
            "progressId": player_progress_data[0],
            "playerId": player_progress_data[1],
            "level": player_progress_data[2],
            "score": player_progress_data[3],
            "carbonPrint": player_progress_data[4],
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


@app.route('/riddles')
def riddles():
    all_riddles = fetch_riddle_query()
    print(all_riddles)
    response = all_riddles

    return response

if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)
