from flask import Flask, jsonify, request
from flask_cors import CORS
from script import tracking
from heatmap import heatmap

app = Flask(__name__)
CORS(app)

@app.route('/analyse', methods=['POST'])
def analyseVideo():
    # Recibe la ruta del video
    ruta_video = request.json
    print(ruta_video)
    # Corre la función del ball_tracking y guarda los puntos de pique
    pts_pique = tracking(ruta_video)

    # Se crea una nueva lista de puntos sin el N° de frame
    def filtrar(punto):
        punto = punto[0]
        return punto

    new_pts_pique = list(map(filtrar, pts_pique))
    
    # Se corre la función de heatmap

    #heatmap(new_pts_pique)

    # Devuelve un JSON con todos los datos
    return jsonify({
        'puntosPique': pts_pique
    })

if __name__ == '__main__':
    app.run(debug = True, port = 5000)