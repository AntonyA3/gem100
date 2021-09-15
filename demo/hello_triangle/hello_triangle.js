const FPS = 60
const canvas0 = document.getElementById('canvas0')
const gl = canvas0.getContext('webgl')
const triangle = new Float32Array([
    -1.0,-1.0,0.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    1.0, -1.0, 0.0, 0.0, 0.0, 1.0
])

function getHelloShader(){
 
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)        
    gl.shaderSource(vertexShader, document.getElementById('hello-vert').textContent)
    gl.compileShader(vertexShader)
    console.log( gl.getShaderInfoLog(vertexShader))

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader,  document.getElementById('hello-frag').textContent)
    gl.compileShader(fragmentShader)
    console.log( gl.getShaderInfoLog(fragmentShader))

    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    console.log(gl.getProgramInfoLog(program))
    return program

}

function main() {
    var deltaTime = 1 /FPS
    var time = 0
    var helloShader = getHelloShader()
    var triBuffer = gl.createBuffer()
    var vPosLocation = gl.getAttribLocation(helloShader, 'vPos')
    var vColorLocation = gl.getAttribLocation(helloShader, 'vColor')
    gl.bindBuffer(gl.ARRAY_BUFFER, triBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW)
    var update = function (newTime) {
        gl.viewport(0,0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        gl.clearColor(0.5,0.5, 0.5, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.useProgram(helloShader)
        gl.bindBuffer(gl.ARRAY_BUFFER, triBuffer)
        gl.vertexAttribPointer(vPosLocation, 3, gl.FLOAT, gl.FALSE, 6 * 4, 0)
        gl.enableVertexAttribArray(vPosLocation)
        gl.vertexAttribPointer(vColorLocation, 3, gl.FLOAT, gl.FALSE, 6 * 4, 3 * 4)
        gl.enableVertexAttribArray(vColorLocation)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)


        deltaTime = (newTime - time) * 0.001
        time = newTime
        window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
}

window.onload = () => main()
