from collections import deque
from tkinter import N
from turtle import pos
from cv2 import minEnclosingCircle
import numpy as np
import argparse
import cv2
import imutils
import time

# Argumentos del programa
ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
ap.add_argument("-b", "--buffer", type=int, default=64,
	help="max buffer size")
args = vars(ap.parse_args())

def tp_fix(contornos, pre_centro, count):
    cnts_pts = []
    if numeroGlob == 0: 
        medidorX = 100
        medidorY = 101
    else: 
        medidorX = 70
        medidorY = 71
    for contorno in contornos:
        ((x, y), radius) = cv2.minEnclosingCircle(contorno)
        if x - pre_centro[0][0] > medidorX * resizer_glob[numeroGlob] or pre_centro[0][0] - x > medidorX * resizer_glob[numeroGlob] or y - pre_centro[0][1] > medidorY * resizer_glob[numeroGlob] or pre_centro[0][1] - y > medidorY * resizer_glob[numeroGlob] and count <= 0.5:
            continue
        cnts_pts.append(contorno)
    if cnts_pts != []:
        return cualEstaMasCerca(pre_centro, cnts_pts)
    else: print("No se encontró la pelota")

def cualEstaMasCerca(punto, lista):
    suma = []
    suma2 = []
    for i in lista:
        (xCenter, yCenter), radius = cv2.minEnclosingCircle(i)
        difEnX = int(xCenter) - int(punto[0][0])
        difEnY = int(yCenter) - int(punto[0][1])
        difRadio = int(radius) - int(punto[1])
        
        if difEnX < 0:
            difEnX *= -1
        
        if difEnY < 0:
            difEnY *= -1 
        
        if difRadio < 0:
            difRadio *= -1
        
        suma.append(difEnX + difEnY + difRadio)
        suma2.append(i)
    return suma2[suma.index(min(suma))]

# def pica (centro1, centro2, centro3):
#     print("Esta adentro de picaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", centro1, centro2, centro3)
#     gerardPique = True
#     a = centro1 - centro2
#     b = centro2 - centro3
#     if a <= 0 and b >= 0 or a >= 0 and b <= 0:
#         print("a", a)
#         print("b", b)
#         gerardPique = False
#     print("Picó?", gerardPique)
#     return gerardPique

# def pica (centro1, centro2, centro3):
#     print("Esta adentro de pica", centro1, centro2, centro3)
#     gerardPique = False
#     abajo = False
#     if centro2 >= altoOG * resizer_glob[numeroGlob] / 2:
#         abajo = True
#     if abajo and centro1 > centro2 or abajo == False and centro1 < centro2:
#         gerardPique = True
#     print("Picó?", gerardPique)
#     return gerardPique

def pica (count):
    if center_glob[numeroGlob] == None: return False
    abajoA = False
    abajoB = False
    a = posiblesPiques_pers[0][0][1] / resizer_glob[numeroGlob]
    b = posiblesPiques_pers[1][0][1] / resizer_glob[numeroGlob]
    if a >= 474 / 2: abajoA = True
    if b >= 474 / 2: abajoB = True
    if abajoB and abajoA and a > b and count <= 1:
        return True
    elif abajoB and abajoA and a < b and count >= 1:
        return True

def contornosQuietos(cnts, todosContornos, contornosIgnorar):
    centrosCerca = False
	#print("Length Contornos", len(cnts))
    for i in cnts:
        count = 0
        (x, y), radius = cv2.minEnclosingCircle(i)
        x, y, radius = int(x), int(y), int(radius)
        #print("Contornos en el frame", (x, y, radius))
        for l in todosContornos:
            for j in l:
                if x - j[0][0] >= -10 and x - j[0][0] <= 10 and y - j[0][1] >= -10 and y - j[0][1] <= 10:
                    centrosCerca = True
                else:
                    centrosCerca = False
                    break
            if centrosCerca:
                #print("Estoy Cerca, Todos contornos Count:", todosContornos[count])
                todosContornos[count].append([(x, y, radius)])
                #print("Después de apendearme, estoy así", todosContornos[count])
                break
            count += 1
        if not centrosCerca:
            #print("Estoy Lejos")
            todosContornos.append([[(x, y, radius)]])
    
    for l in todosContornos:
        existe = False
        if (len(l) >= 10):
            promedioIgnorarX = 0
            promedioIgnorarY = 0
            for j in l:
                promedioIgnorarX += j[0][0]
                promedioIgnorarY += j[0][1]
            promedioIgnorarX /= len(l)
            promedioIgnorarY /= len(l)
            promedioIgnorarX, promedioIgnorarY = int(np.rint(promedioIgnorarX)), int(np.rint(promedioIgnorarY))
            if (len(contornosIgnorar) == 0): contornosIgnorar.append((promedioIgnorarX, promedioIgnorarY))
            for h in contornosIgnorar:
                #cv2.circle(frame, (h[0], h[1]), 20, (255, 255, 255), -1)
                if (h[0] == promedioIgnorarX and h[1] == promedioIgnorarY):
                    existe = True
            if not existe:
                contornosIgnorar.append((promedioIgnorarX, promedioIgnorarY))
                #print("Encontré un contorno que tengo que ignorar")
    
    #print("Todos los Contornos", todosContornos)
    #print("Contornos a Ignorar", contornosIgnorar)

def ignorarContornosQuietos(cnts, contornosIgnorar):
    new_cnts = []
    Ignorar = False
    for cnt in cnts:
        (x, y), radius = minEnclosingCircle(cnt)
        print("Circulo Posible", (int(x), int(y), int(radius)))
        for i in contornosIgnorar:
            if x - i[0] >= -20 and x - i[0] <= 20 and y - i[1] >= -20 and y - i[1] <= 20:
                Ignorar = True
                break
            else:
                Ignorar = False
        
        if Ignorar == False: new_cnts.append(cnt)
    
    for i in new_cnts:
        print("Nueva lista", minEnclosingCircle(i))
    return new_cnts

def seEstaMoviendo(ultCentros):
    movimiento = False
    for i in range(2):
        restaA = ultCentros[4][0][i] - ultCentros[3][0][i]
        restaB = ultCentros[3][0][i] - ultCentros[2][0][i]
        restaC = ultCentros[2][0][i] - ultCentros[1][0][i]
        restaD = ultCentros[1][0][i] - ultCentros[0][0][i]
        if restaA + restaB + restaC + restaD >= 15:
            movimiento = True
        else:
            movimiento = False
            break
    
    if movimiento: 
        return True
    return False

def eliminarContornosInservibles(todosContornos):
    count = 0
    aBorrar = []
    for i in todosContornos:
        if (len(i) <= 5):
            aBorrar.append(count)
        count += 1
    
    n = 0
    for i in aBorrar:
        todosContornos.pop(i - n)
        n += 1

def todo(frame, numeroGlob):
    global radius
    global x
    global y
    global Gerard
    global esGerard
    global posiblePique
    global countDifPiques

    anchoOG = frame.shape[1]
    altoOG = frame.shape[0]
    
    estaCercaX = anchoOG * 15/100
    estaCercaY = altoOG * 15/100

    frame = imutils.resize(frame, anchoOG * resizer_glob[numeroGlob], altoOG * resizer_glob[numeroGlob])

    # Cámara lenta para mayor análisis
    #cv2.waitKey(100)
    
    blurred = cv2.GaussianBlur(frame, (11, 11), 0)
    #blurred = cv2.dilate(frame, None, iterations=2)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
    
    # Filtra los tonos verdes de la imagen
    mask = cv2.inRange(hsv, greenLower, greenUpper)
    #cv2.imshow("mask2", mask)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)
    #mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)   #morphology close operation for remove small noise point
    #cv2.imshow("mask3", mask)
    
    # Toma todos los contornos de la imagen
    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    
    center_glob[numeroGlob] = None
    
    if numeroGlob == 0:
        for h in contornosIgnorar_norm:
            cv2.circle(frame, (h[0], h[1]), 20, (255, 255, 255), -1)
    
    else:
        for h in contornosIgnorar_pers:
            cv2.circle(frame, (h[0], h[1]), 20, (255, 255, 255), -1)
    
    if (countSegundosTotales % 5 == 0):
        if numeroGlob == 0:
            eliminarContornosInservibles(todosContornos_norm)
        else:
            eliminarContornosInservibles(todosContornos_pers)
    
    if len(cnts) > 0:
        # Busca el contorno más grande y encuentra su posición (x, y)
        if numeroGlob == 0:
            contornosQuietos(cnts, todosContornos_norm, contornosIgnorar_norm)
            if len(ultimosCentros_norm) == 5 and count_glob[numeroGlob] >= 0.3 and not seEstaMoviendo(ultimosCentros_norm):
                cnts = ignorarContornosQuietos(cnts, contornosIgnorar_norm)
        
        else:
            contornosQuietos(cnts, todosContornos_pers, contornosIgnorar_pers)
            if len(ultimosCentros_pers) == 5 and count_glob[numeroGlob] >= 0.3 and not seEstaMoviendo(ultimosCentros_pers):
                #print("Count", count_glob[numeroGlob])
                #print("Ultimos Centros", ultimosCentros_pers)
                cnts = ignorarContornosQuietos(cnts, contornosIgnorar_pers)
        
        if len(cnts) > 0:    
            if primeraVez_glob[numeroGlob]:
                c = max(cnts, key=cv2.contourArea)
                ((x, y), radius) = cv2.minEnclosingCircle(c)
                M = cv2.moments(c)
                center_glob[numeroGlob] = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])), int(radius)
                # if esResult == False:
                #     primeraVez_glob[0] = False
                # else:
                #     primeraVez_glob[1] = False
                primeraVez_glob[numeroGlob] = False
                preCentro_glob[numeroGlob] = center_glob[numeroGlob]
                count_glob[numeroGlob] = 0
                count2_glob[numeroGlob] = 0
                if numeroGlob == 0:
                    pique3_norm.appendleft(center_glob[numeroGlob][0][1])
                    ultimosCentros_norm.appendleft(center_glob[numeroGlob])
                else:
                    pique3_pers.appendleft(center_glob[numeroGlob][0][1])
                    ultimosCentros_pers.appendleft(center_glob[numeroGlob])
            
            else:
                c = tp_fix(cnts, preCentro_glob[numeroGlob], count_glob[numeroGlob])
                
                if c is not None:
                    ((x, y), radius) = cv2.minEnclosingCircle(c)
                    M = cv2.moments(c)
                    center_glob[numeroGlob] = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"])), int(radius)
                    preCentro_glob[numeroGlob] = center_glob[numeroGlob]
                    # count2_glob[numeroGlob] += count_glob[numeroGlob]
                    count2_glob[numeroGlob] += count_glob[numeroGlob]
                    count_glob[numeroGlob] = 0
                    if numeroGlob == 0:
                        pique3_norm.appendleft(center_glob[numeroGlob][0][1])
                        ultimosCentros_norm.appendleft(center_glob[numeroGlob])
                    else:
                        pique3_pers.appendleft(center_glob[numeroGlob][0][1])
                        ultimosCentros_pers.appendleft(center_glob[numeroGlob])
                    #if len(pique3) == 3 and count2 <= 0.1:
                        #pica(pique3[2], pique3[1], pique3[0])
                        #count2 = 0
                
                else:
                    if count_glob[numeroGlob] >= 0.3 and numeroGlob == 0 or count_glob[numeroGlob] >= 0.4 and numeroGlob == 1:
                        primeraVez_glob[numeroGlob] = True
                        preCentro_glob[numeroGlob] = None
                    count_glob[numeroGlob] += 1/fps
                    count2_glob[numeroGlob] = 0
                
            # Sigue si el contorno tiene cierto tamaño
            if radius > 0 and primeraVez_glob[numeroGlob] and c is not None or c is not None:
                # Dibuja el círculo en la pelota
                cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 255), 2)
                cv2.circle(frame, (center_glob[numeroGlob][0][0], center_glob[numeroGlob][0][1]), 5, (0, 0, 255), -1)
    
    else:
        if count_glob[numeroGlob] >= 0.3 and numeroGlob == 0 or count_glob[numeroGlob] >= 0.4 and numeroGlob == 1:
            primeraVez_glob[numeroGlob] = True
            preCentro_glob[numeroGlob] = None
        count_glob[numeroGlob] += 1/fps
        count2_glob[numeroGlob] = 0
    

    # La variable count es asignada
    # if esResult == False: 
    #     if count != 0:
    #         count_glob2[0] += count
    #     else:
    #         count_glob2[0] = count
    # else:
    #     if count != 0:
    #         count_glob2[1] += count
    #     else:
    #         count_glob2[1] = count
    
    # Actualiza los puntos para trazar la trayectoria
    if numeroGlob == 0:
        pts_norm.appendleft(center_glob[numeroGlob])
    else:
        pts_pers.appendleft(center_glob[numeroGlob])
    
    if numeroGlob == 0:
        for i in range(1, len(pts_norm)):
            # Ignora los puntos de trayectoria inexistentes
            if pts_norm[i - 1] is None or pts_norm[i] is None:
                continue
            
            # Traza la trayectoria
            thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
            cv2.line(frame, pts_norm[i - 1][0], pts_norm[i][0], (0, 0, 255), thickness)
    
    else:
        for i in range(1, len(pts_pers)):
            # Ignora los puntos de trayectoria inexistentes
            if pts_pers[i - 1] is None or pts_pers[i] is None:
                continue
            
            # Traza la trayectoria
            thickness = int(np.sqrt(args["buffer"] / float(i + 1)) * 2.5)
            cv2.line(frame, pts_pers[i - 1][0], pts_pers[i][0], (0, 0, 255), thickness)
    
    bajando = False
    
    if (center_glob[numeroGlob] is not None):
        #print("Centro", center_glob[numeroGlob][0][1])
        
        if numeroGlob == 0:
            pique_norm.appendleft(center_glob[numeroGlob][0][1])
            if (len(pique_norm) >= 2):
                if (pique_norm[0] - pique_norm[1] > 0):
                    bajando = True
                if (pique_norm[0] - pique_norm[1] != 0):
                    pique2_norm.appendleft((bajando, numeroFrame))
                else: bajando = "Indeterminación"
            print("Bajando", bajando)
        
        else:
            pique_pers.appendleft(center_glob[numeroGlob][0][1])
            if (len(pique_pers) >= 2):
                if (pique_pers[0] - pique_pers[1] > 0):
                    bajando = True
                if (pique_pers[0] - pique_pers[1] != 0):
                    pique2_pers.appendleft((bajando, numeroFrame))
                else: bajando = "Indeterminación"
            print("Bajando", bajando)
    
    if numeroGlob == 0:
        countDifPiques += 1/fps
        posiblePique = False
        if (len(pique2_norm) >= 2):
            if pique2_norm[0][0] == False and pique2_norm[1][0] == True and preCentro_glob[numeroGlob] is not None and pique2_norm[0][1] - pique2_norm[1][1] <= fps/6:
                print("Pique 2", pique2_norm)
                print("Gerard")
                posiblePique = True
                posiblesPiques_norm.appendleft(preCentro_glob[numeroGlob])
                if len(posiblesPiques_norm) == 1: countDifPiques = 0 
                frame = cv2.putText(frame, 'Gerard', (preCentro_glob[numeroGlob][0][0], preCentro_glob[numeroGlob][0][1]), cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)
    
    else:
        if (len(pique2_pers) >= 2):
            #if pique2_pers[0][0] == False and pique2_pers[1][0] == True and preCentro_glob[numeroGlob] is not None and pique2_pers[0][1] - pique2_pers[1][1] <= fps/6:
            if posiblePique and preCentro_glob[numeroGlob] is not None:
                print("Pique 2", pique2_pers)
                print("Gerard")
                if posiblePique: posiblesPiques_pers.appendleft(preCentro_glob[numeroGlob])
                if posiblePique and len(posiblesPiques_pers) >= 2:
                    Gerard = pica(countDifPiques)
                    print("Gerard", Gerard)
                countDifPiques = 0
                frame = cv2.putText(frame, 'Gerard', (preCentro_glob[numeroGlob][0][0], preCentro_glob[numeroGlob][0][1]), cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)

    # if numeroGlob == 0:
    #     if center_glob[numeroGlob] is not None:
    #         pique3_norm.appendleft(center_glob[numeroGlob][1])
    #     if len(pique3_norm) == 3 and count2_glob[numeroGlob] <= 0.1:
    #         pica(pique3_norm[2], pique3_norm[1], pique3_norm[0])
    #         count2_glob[numeroGlob] = 0
    # else:
    #     if center_glob[numeroGlob] is not None:
    #         pique3_pers.appendleft(center_glob[numeroGlob][1])
    #     if len(pique3_pers) == 3 and count2_glob[numeroGlob] <= 0.1:
    #         pica(pique3_pers[2], pique3_pers[1], pique3_pers[0])
    #         count2_glob[numeroGlob] = 0

    # if numeroGlob == 0:
    #     Gerard = False
    #     if center_glob[numeroGlob] is not None:
    #         pique3_norm.appendleft(center_glob[numeroGlob])
    #     if (len(pique2_norm) >= 2):
    #         if pique2_norm[0] == False and pique2_norm[1] == True:
    #             frame = cv2.putText(frame, 'Posible Gerard', pique3_norm[1], cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)
    #             Gerard = True
    #             if esGerard:
    #                 print("Picoooooooooooooooooooooooooooooooooo")
    #                 frame = cv2.putText(frame, 'Gerard', pique3_norm[2], cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)
    #     esGerard = None

    # else:
    #     if center_glob[numeroGlob] is not None:
    #         pique3_pers.appendleft(center_glob[numeroGlob])
    #     if (len(pique2_pers) >= 2):
    #         if Gerard:
    #             print("Count2: ", count2_glob[numeroGlob], "Center", center_glob[numeroGlob])
    #             #if len(pique3_pers) == 3 and count2_glob[numeroGlob] <= 0.2 and count2_glob[numeroGlob] > 0 and center_glob[numeroGlob] is not None:
    #             if len(pique3_pers) == 3 and count2_glob[numeroGlob] <= 0.3 and center_glob[numeroGlob] is not None:
    #                 esGerard = pica(pique3_pers[2][1], pique3_pers[1][1], pique3_pers[0][1])
    #                 #pica(pique3_pers[2][1], pique3_pers[1][1], pique3_pers[0][1])
    #                 count2_glob[numeroGlob] = 0
    #             if esGerard:
    #                 print("Picoooooooooooooooooooooooooooooooooo")
    #                 frame = cv2.putText(frame, 'Gerard', pique3_pers[1], cv2.FONT_HERSHEY_COMPLEX, 3, (0, 0, 255), 0, 2)
    
    # Resizea y Muestra el Frame
    if numeroGlob == 0:

        frame = imutils.resize(frame, anchoOG, altoOG)
        frame = imutils.resize(frame, height= 768)
        mask = imutils.resize(mask, anchoOG, altoOG)
        mask = imutils.resize(mask, height= 768)

        cv2.imshow("Mask Normal", mask)
        cv2.imshow("Normal", frame)

    else:

        frame = imutils.resize(frame, anchoOG, altoOG)
        mask = imutils.resize(mask, anchoOG, altoOG)

        cv2.imshow("Mask Perspectiva", mask)
        cv2.imshow("Perspective", frame)

    print("Centro al terminar la iteración", center_glob[numeroGlob])
    print("Numero Global", numeroGlob)

# Toma la cámara si no recibe video
if not args.get("video", False):
    vs = cv2.VideoCapture(0)

    # Toma video en caso de haber
else:
    vs = cv2.VideoCapture(args["video"])

# Puntos de esquinas Alcaraz vs Fucsovics: 366, 196, 608, 198, 78, 378, 724, 398
# Puntos de esquinas TennisBrothers: 311, 106, 456, 105, 89, 331, 628, 326
# Puntos de esquinas TennisBrothers 1080p: 749, 253, 1095, 252, 206, 797, 1518, 785
# Puntos de esquinas TheUltimateClutch Completo: 656, 429, 1044, 426, 0, 866, 1716, 802
# Puntos de esquinas TheUltimateClutch: 137, 355, 602, 348, 1, 889, 606, 866
# Puntos de esquinas TheUltimateClutch Hasta La Red: 1, 458, 606, 448, 1, 889, 606, 866
# Puntos de esquinas TennisBrothers 1080p Hasta La Red: 640, 365, 1180, 360, 206, 797, 1518, 785

# Rango de deteccion de verdes
greenLower = np.array([29, 86, 110])
greenUpper = np.array([64, 255, 255])
greenLower = np.array([29, 50, 110])

topLeftX = 749
topLeftY = 253
topRightX = 1095
topRightY = 252
bottomLeftX = 206
bottomLeftY = 797
bottomRightX = 1518
bottomRightY = 785

#topLeftX = 640
#topLeftY = 365
#topRightX = 1180
#topRightY = 360

pts_norm = deque(maxlen=args["buffer"])
pts_pers = deque(maxlen=args["buffer"])

preCentro_glob = deque(maxlen=2)
preCentro_glob.append(None)
preCentro_glob.append(None)

primeraVez_glob = deque(maxlen=2)
primeraVez_glob.append(True)
primeraVez_glob.append(True)

center_glob = deque(maxlen=2)
center_glob.append(None)
center_glob.append(None)

#kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))  #ellipse kernel

# Fps del video
fps = int(vs.get(cv2.CAP_PROP_FPS))
print(fps)

time.sleep(2.0)

# Indica el tiempo que pasó desde que se detectó la última pelota
count_glob = deque(maxlen=2)
count_glob.append(0)
count_glob.append(0)

# Indica cuanto tiempo pasa entre tres centros consecutivos. 
# Esto para saber si detectó la pelota correctamente a la hora de determinar el pique
count2_glob = deque(maxlen=2)
count2_glob.append(0)
count2_glob.append(0)

# countSegundosTotales cuenta cuanto tiempo pasó en segundos desde que empezó el video 
countSegundosTotales = 0

ultimosCentros_norm = deque(maxlen=5)
ultimosCentros_pers = deque(maxlen=5)

todosContornos_norm = []
todosContornos_pers = []

contornosIgnorar_norm = []
contornosIgnorar_pers = []

pique_norm = deque(maxlen=4)
pique_pers = deque(maxlen=4)

pique2_norm = deque(maxlen=4)
pique2_pers = deque(maxlen=4)

pique3_norm = deque(maxlen=3)
pique3_pers = deque(maxlen=3)

resizer_glob = deque(maxlen=2)
resizer_glob.append(3)
resizer_glob.append(15)

altoOG = 0
anchoOG = 0

numeroGlob = 0
Gerard = None
esGerard = None
posiblePique = False
posiblesPiques_norm = deque()
posiblesPiques_pers = deque()


# CountDifPiques cuenta cuanto tiempo pasa desde que se encontró un pique hasta que se encuentra el siguiente
countDifPiques = 0

numeroFrame = 0

while True:
    numeroFrame += 1
    print("Numero de Frame: ", numeroFrame)

    countSegundosTotales += 1/fps

    frame = vs.read()
    frame = frame[1] if args.get("video", False) else frame

    if frame is None:
        break

    pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                         [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
    pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])

    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    result = cv2.warpPerspective(frame, matrix, (164, 474))

    numeroGlob = 0
    todo(frame, numeroGlob)
    numeroGlob = 1
    todo(result, numeroGlob)

    # Terminar la ejecución si se presiona la "q"
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break
    
    #print("Centro al terminar la iteración", center)
    print("Pasé de frame")


if not args.get("video", False):
    vs.stop()

else:
    vs.release()

cv2.destroyAllWindows()