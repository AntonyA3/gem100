//import {mat4} from "../gl-matrix.js";

const FPS = 60
const canvas0 = document.getElementById('canvas0')
const gl = canvas0.getContext('webgl')
const path = 'http://localhost:8000/demo/hello_cube'

const mat4 = glMatrix.mat4
const vec3 = glMatrix.vec3

function ShaderProgramLoader() {}
    
   
ShaderProgramLoader.READY = 0
ShaderProgramLoader.FETCHING = 1
ShaderProgramLoader.FAILED = 2
ShaderProgramLoader.COMPLETE = 3
ShaderProgramLoader.vertexText ='x'
ShaderProgramLoader.fragmentText = 'y'
ShaderProgramLoader.state = ShaderProgramLoader.READY
ShaderProgramLoader.resolveFailure = function () {
    ShaderProgramLoader.state = ShaderProgramLoader.READY
}
ShaderProgramLoader.getShaderText = function(vertexFile, fragmentFile){
    ShaderProgramLoader.state = ShaderProgramLoader.FETCHING
    fetch(vertexFile, {method: 'GET'}).then(res =>{
        res.text().then(text =>{
            ShaderProgramLoader.vertexText = text
        })

        fetch(fragmentFile, {method: 'GET'}).then(res =>{
            res.text().then(text =>{
                ShaderProgramLoader.fragmentText = text
                ShaderProgramLoader.state = ShaderProgramLoader.COMPLETE
            }) 
        }).catch(error => console.log(error))
        
    }).catch(error => console.log(error))
}

const cube = new Float32Array([
    //left face
    -1.0, -1.0, 1.0, 1.0, 0.0, 0.0,
    -1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
    -1.0, 1.0, -1.0, 1.0, 0.0, 0.0,
    -1.0, -1.0, -1.0, 1.0, 0.0, 0.0,

    //top face
    -1.0, 1.0, -1.0, 0.0, 1.0, 0.0,
    -1.0, 1.0, 1.0, 0.0, 1.0, 0.0,
    1.0, 1.0, 1.0, 0.0, 1.0, 0.0,
    1.0, 1.0, -1.0, 0.0, 1.0, 0.0,

    //front face 
    -1.0, -1.0, -1.0, 0.0, 0.0, 1.0,
    -1.0, 1.0, -1.0, 0.0, 0.0, 1.0,
    1.0, 1.0, -1.0, 0.0, 0.0, 1.0,
    1.0, -1.0, -1.0, 0.0, 0.0, 1.0,

    //bottom face
    -1.0, -1.0, 1.0, 0.0, 1.0, 1.0,
    -1.0, -1.0, -1.0, 0.0, 1.0, 1.0,
    1.0, -1.0, -1.0, 0.0, 1.0, 1.0, 
    1.0, -1.0, 1.0, 0.0, 1.0, 1.0,

    //right face
    1.0, -1.0, -1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, -1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
    1.0, -1.0, 1.0, 1.0, 0.0, 1.0,

    //back face
    1.0, -1.0, 1.0, 1.0, 1.0, 0.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
    -1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
    -1.0, -1.0, 1.0, 1.0, 1.0, 0.0
])
const cubeElements = new Uint16Array([
    0, 1, 2,        0, 2, 3,
    4, 5, 6,        4, 6, 7,
    8, 9, 10,       8, 10, 11,
    12, 13, 14,     12, 14, 15,
    16, 17, 18,     16, 18, 19,
    20, 21, 22,     20, 22, 23
])

function getProgram(vertexText,fragmentText){
 
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)        
    gl.shaderSource(vertexShader, vertexText)
    gl.compileShader(vertexShader)
    console.log( gl.getShaderInfoLog(vertexShader))

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentText)
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
    var LOADING = 0
    var ACTIVE = 1
    var deltaTime = 1 /FPS
    var time = 0
    var state = LOADING  
    var shouldUpdate = true
    var vColorLocation
    var vPosLocation
    var cubeVertexBuffer
    var cubeElementBuffer
    var helloShader
    
    var update = function (newTime) {
        switch(state){
            case LOADING:
                if(ShaderProgramLoader.state == ShaderProgramLoader.READY){
                    ShaderProgramLoader.getShaderText( path + '/flat.vert', path + '/flat.frag')  
                }else if(ShaderProgramLoader.state == ShaderProgramLoader.FAILED){
                    console.log("failed to load shader")
                    shouldUpdate = false
                    ShaderProgramLoader.resolveFailure()
                }else if(ShaderProgramLoader.state == ShaderProgramLoader.COMPLETE){
                    helloShader = getProgram(ShaderProgramLoader.vertexText, ShaderProgramLoader.fragmentText)
                    vPosLocation = gl.getAttribLocation(helloShader, 'vPos')
                    vColorLocation = gl.getAttribLocation(helloShader, 'vColor')
                    cubeVertexBuffer = gl.createBuffer()
                    cubeElementBuffer = gl.createBuffer()
                    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer)
                    gl.bufferData(gl.ARRAY_BUFFER, cube, gl.STATIC_DRAW)

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeElementBuffer)
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeElements, gl.STATIC_DRAW)

                    state = ACTIVE   
                }
                break
            case ACTIVE:
                if(shouldUpdate){
                    let translation = vec3.create()
                    let rotY = mat4.create()
                    let rotX = mat4.create()
                    let projection = mat4.create()                    
                    let translationMat = mat4.create()
                    let camMat = mat4.create()
                    let viewMatrix = mat4.create()

                    mat4.perspective(projection,Math.PI *0.5,640 / 480, 1.0, 100.0)
                    mat4.fromYRotation(rotY, time * 0.001)
                    mat4.fromXRotation(rotX, time * 0.002)
                    vec3.set(translation, 0, 0, 10)
                    mat4.fromTranslation(translationMat, translation)
                    mat4.multiply(camMat, rotY, translationMat)
                    mat4.multiply(camMat, rotX, camMat)
                    mat4.invert(viewMatrix, camMat)
                    
                    gl.viewport(0,0, gl.drawingBufferWidth, gl.drawingBufferHeight)
                    gl.enable(gl.DEPTH_TEST)
                    gl.clearColor(0.5,0.5, 0.5, 1.0)
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                    gl.viewport(0,0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    
                    gl.useProgram(helloShader)
                    let uProjMatLocation = gl.getUniformLocation(helloShader, 'uProjMat')
                    let uViewMatLocation = gl.getUniformLocation(helloShader, 'uViewMat')
                    gl.uniformMatrix4fv(uProjMatLocation, gl.GL_FALSE, projection)
                    gl.uniformMatrix4fv(uViewMatLocation, gl.GL_FALSE, viewMatrix)

                                
                    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer)
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeElementBuffer)
                    gl.vertexAttribPointer(vPosLocation, 3, gl.FLOAT, gl.FALSE, 6 * 4, 0)
                    gl.enableVertexAttribArray(vPosLocation)
                    gl.vertexAttribPointer(vColorLocation, 3, gl.FLOAT, gl.FALSE, 6 * 4, 3 * 4)
                    gl.enableVertexAttribArray(vColorLocation)

                    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
                    

                }
                break
        }
        

        deltaTime = (newTime - time) * 0.001
        time = newTime
        window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
}

window.onload = () => main()
