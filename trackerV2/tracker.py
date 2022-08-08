from cmath import rect
import cv2 as cv

SENSITIVITY_VALUE = 20
BLUR_SIZE = 10
theObject = {0, 0}

objectBoundingRectangle = rect(0, 0, 0, 0)

def searchForMovement(thresholdImage, cameraFeed):
    objectDetected = False
    temp = thresholdImage
    contours = cv.findContours(temp, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

    if (contours.size()>0):
        objectDetected = True
    else:
        objectDetected = False

    if (objectDetected):
        largestContourVec = 0
        largestContourVec.push_back(contours.at(contours.size()-1))