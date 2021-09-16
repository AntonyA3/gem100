#version 100

attribute vec3 vPos;
attribute vec3 vColor;

varying vec3 fColor;

uniform mat4 uProjMat;
uniform mat4 uViewMat;

void main() {
    fColor = vColor;
    gl_Position = uProjMat * uViewMat * vec4(vPos, 1.0);
}