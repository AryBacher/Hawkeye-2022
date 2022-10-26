from flask import Flask, jsonify, request
from flask_cors import CORS
from script import tracking

app = Flask(__name__)
CORS(app)

@app.route('/analyse', methods=['POST'])
def analyseVideo():
    # Recibe la ruta del video
    ruta_video = request.json
    print(ruta_video)
    # Corre la función del ball_tracking y guarda los puntos de pique
    pts_pique = tracking(ruta_video)

    # Corre la función del heatmap


    return jsonify({
        'puntosPique': pts_pique,
    })

if __name__ == '__main__':
    app.run(debug = True, port = 5000)