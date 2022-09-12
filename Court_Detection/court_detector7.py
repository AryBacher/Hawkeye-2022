import cv2
import numpy as np
import imutils
import argparse
import time

ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video",
	help="path to the (optional) video file")
args = vars(ap.parse_args())

vs = cv2.VideoCapture(args["video"])

time.sleep(2.0)

while True:
    frame = vs.read()
    frame = frame[1] if args.get("video", False) else frame

    if frame is None:
        break

    frame = imutils.resize(frame, width=800, height=600)

    topLeftX = 311
    topLeftY = 106
    topRightX = 456
    topRightY = 105
    bottomLeftX = 89
    bottomLeftY = 331
    bottomRightX = 628
    bottomRightY = 326

    #Puntos de Esquinas Alcaraz vs Fucsovics: 366, 196, 608, 198, 78, 378, 724, 398
    #Puntos de Esquinas TennisBrothers: 311, 106, 456, 105, 89, 331, 628, 326

    # cv2.line(frame, (topLeftX,topLeft2), (topRight1,topRight2), (255,0,0), 2)
    # cv2.line(frame, (topLeftX,topLeft2), (bottomLeft1,bottomLeft2), (255,0,0), 2)
    # cv2.line(frame, (topRight1,topRight2), (bottomRight1,bottomRight2), (255,0,0), 2)
    # cv2.line(frame, (bottomRight1,bottomRight2), (bottomLeft1,bottomLeft2), (255,0,0), 2)

    cv2.circle(frame, (topLeftX, topLeftY), 2, (0, 0, 255), -1)
    cv2.circle(frame, (topRightX, topRightY), 2, (0, 0, 255), -1)
    cv2.circle(frame, (bottomLeftX, bottomLeftY), 2, (0, 0, 255), -1)
    cv2.circle(frame, (bottomRightX, bottomRightY), 2, (0, 0, 255), -1)


    pts1 = np.float32([[topLeftX, topLeftY],       [topRightX, topRightY],
                    [bottomLeftX, bottomLeftY], [bottomRightX, bottomRightY]])
    pts2 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])

    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    result = cv2.warpPerspective(frame, matrix, (164, 474))

    pts12 = np.float32([[261, 56],       [496, 55],
                    [39, 381], [678, 386]])
    pts22 = np.float32([[0, 0], [164, 0], [0, 474], [164, 474]])

    matrix2 = cv2.getPerspectiveTransform(pts12, pts22)
    result2 = cv2.warpPerspective(frame, matrix2, (164, 474))

    cv2.line(result, (0, 110), (165, 110), (0, 0, 255), 1)
    cv2.line(result, (0, 364), (165, 364), (0, 0, 255), 1)
    cv2.line(result, (0, 237), (165, 237), (0, 0, 255), 1)

    salida = cv2.imwrite("RegresionCuadrática.jpg", result)

    cv2.imshow("Image", frame)
    cv2.imshow("Perspective transformation", result)
    cv2.imshow("Perspective transformation Test", result2)
    
	# Terminar la ejecución si se presiona la "q"
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
    	break
vs.release()
cv2.destroyAllWindows()