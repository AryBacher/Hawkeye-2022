import { Router } from 'express'
import { spawn } from 'child_process';

const router = Router();

router.post('/python', (req, res) =>{
    const childPython = spawn('python', ['script.py', "E:/Guido/Documentos/rogramación/Hawkeye/Videos Tenis para Analizar/InkedInkedTennisBrothersVideo1080p.mp4"])

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })

    childPython.on('close', (code) => {
        console.log(`child process exited with: ${code}`)
    })
})

export default router