from script import tracking
from heatmap import heatmap
import base64 as b64
from script2 import tracking2

#tracking(r"E:\Guido\Documentos\Programación\Hawkeye\Videos Tenis para Analizar\InkedInkedTennisBrothersVideo1080p.mp4")

# pts_pique = [((100, 200), 30), ((200, 300), 30), ((50, 400), 30), ((10, 90), 30)]

# def filtrar(punto):
#     punto = punto[0]
#     return punto

# new_pts_pique = list(map(filtrar, pts_pique))
# print(new_pts_pique)

# n = 3.1234792
# print(n)
# print(type(n))
# n = float("{:.2f}".format(n))
# print(n)
# print(type(n))

# image = open('minimap.jpg', 'rb')
# image64 = b64.b64encode(image.read())
# print(image64)

#heatmap([(110, 211), (78, 411), (80, 399), (58, 382), (18, 429), (14, 413), (47, 390), (5, 169), (14, 94), (22, 35), (57, 87), (6, 236), (9, 180), (27, 29), (130, 352), (158, 451), (111, 321), (116, 360), (157, 267), (154, 225), (152, 179), (152, 179), (135, 151), (130, 430), (152, 387), (82, 66), (87, 420), (31, 222), (27, 370), (67, 43), (64, 103), (59, 145), (18, 396), (22, 349), (66, 38), (60, 101), (49, 193), (30, 411), (157, 410), (129, 316), (113, 461), (90, 14), (48, 374), (18, 422), (14, 379), (6, 286), (6, 286), (4, 243), (57, 405), (57, 405), (58, 406), (59, 408), (89, 111), (111, 379), (139, 402), (118, 417), (84, 38), (84, 38), (86, 82), (103, 362)])

# pts_pique = tracking(r"C:\Users\46919295\Documents\GitHub\Hawkeye\Videos Tenis para Analizar\InkedInkedTennisBrothersVideo1080p.mp4")
# print("pique", pts_pique)

# # Se crea una nueva lista de puntos sin el N° de frame
# def filtrar(punto):
#     punto = punto[0]
#     return punto

# new_pts_pique = list(map(filtrar, pts_pique))
# print("new pique", new_pts_pique)

# # Se corre la función de heatmap

# mapa = heatmap(new_pts_pique)

# datos = tracking2(r"E:\Guido\Documentos\Programación\Hawkeye\Videos Tenis para Analizar\InkedInkedTennisBrothersVideo1080p.mp4")

# print("PIQUES", datos[0])
# print("VELOCIDADES", datos[1])
esquinas1 = [[ 642, 317 ], [ 116, 324 ],  [ 475, 96 ],  [ 330, 101 ]]
esquinas2 = [[ 642, 317 ], [ 116, 324 ],  [ 475, 96 ],  [ 330, 101 ]]

izq = [[2000, 0], [2000, 0]]
for pt in esquinas1:
    count = 0
    for i in izq:
        print("i =", i)
        print("pt[0] =", pt[0])
        print("count =", count)
        if pt[0] < i[0]:
            izq[count] = pt
            print("pt =", pt)
            esquinas1.pop(count)
        count += 1

print(izq)