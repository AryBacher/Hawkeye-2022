import cv2
import numpy as np
import imutils

while True:


    frame = cv2.imread("tennis.jpg")

    #frame = imutils.resize(frame, width=800, height=600)
    # def determinarPos(event,x,y,flags,param):
    #     global mouseX,mouseY
    #     if event == cv2.EVENT_LBUTTONDBLCLK:
    #         cv2.circle(frame,(x,y),100,(255,0,0),-1)
    #         mouseX,mouseY = x,y
    #         print(mouseX)
    #         print(mouseY)

    
    #cv2.setMouseCallback("frame",determinarPos)

    topLeftX = 158
    topLeftY = 30
    topRightX = 377
    topRightY = 30
    bottomLeftX = 90
    bottomLeftY = 273
    bottomRightX = 447
    bottomRightY = 273

    #Puntos de Esquinas Alcaraz vs Fucsovics: 366, 196, 608, 198, 78, 378, 724, 398
    #Puntos de Esquinas TennisBrothers: 311, 106, 456, 105, 89, 331, 628, 326

    ###### IMPORTANTE: 20px = 1 METRO

    # cv2.line(frame, (topLeftX,topLeft2), (topRight1,topRight2), (255,0,0), 2)
    # cv2.line(frame, (topLeftX,topLeft2), (bottomLeft1,bottomLeft2), (255,0,0), 2)
    # cv2.line(frame, (topRight1,topRight2), (bottomRight1,bottomRight2), (255,0,0), 2)
    # cv2.line(frame, (bottomRight1,bottomRight2), (bottomLeft1,bottomLeft2), (255,0,0), 2)

    #cv2.circle(frame, (topLeftX, topLeftY), 3, (0, 0, 255), -1)
    #cv2.circle(frame, (topRightX, topRightY), 3, (0, 0, 255), -1)
    #cv2.circle(frame, (bottomLeftX, bottomLeftY), 3, (0, 0, 255), -1)
    #cv2.circle(frame, (bottomRightX, bottomRightY), 3, (0, 0, 255), -1)


    pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                    [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
    pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])

    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    result = cv2.warpPerspective(frame, matrix, (164, 474))

    pts12 = np.float32([[261, 56],       [496, 55],
                    [39, 381], [678, 386]])
    pts22 = np.float32([[20, 20], [184, 0], [0, 494], [184, 494]])

    matrix2 = cv2.getPerspectiveTransform(pts1, pts22)
    result2 = cv2.warpPerspective(frame, matrix2, (204, 514))

    result = imutils.resize(result, height=800)

    cv2.imshow("frame", frame)
    cv2.imshow('pers', result)

    salida = cv2.imwrite("RegresionCuadrática.jpg", result)

    #cv2.imshow("Image", frame)
    #cv2.imshow("Perspective transformation", result)
    #cv2.imshow("Perspective transformation Test", result2)
    
	# Terminar la ejecución si se presiona la "q"
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
    	break

cv2.destroyAllWindows()