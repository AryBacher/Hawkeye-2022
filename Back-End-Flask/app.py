from flask import Flask, jsonify, request
from flask_cors import CORS
from script import tracking
from heatmap import heatmap
from script2 import tracking2

app = Flask(__name__)
CORS(app)

@app.route('/analyse', methods=['POST'])
def analyseVideo():
    # Recibe la ruta del video
    params = request.json
    print(params)
    ruta_video = params['rutaPython']
    corners = params['finalCorners']
    print(ruta_video)
    print(corners)
    # Corre la función del ball_tracking y guarda los puntos de pique
    datosFlask = tracking2(ruta_video, corners)
    pts_pique = datosFlask[0]
    velocidades = datosFlask[1]

    # Se crea una nueva lista de puntos sin el N° de frame
    def filtrar(punto):
        punto = punto[0]
        return punto

    new_pts_pique = list(map(filtrar, pts_pique))
    
    # Se corre la función de heatmap

    heatmap(new_pts_pique)

    # Devuelve un JSON con todos los datos
    return jsonify({
        'puntosPique': pts_pique,
        'velocidades': velocidades
    })

if __name__ == '__main__':
    app.run(debug = True, port = 5000)