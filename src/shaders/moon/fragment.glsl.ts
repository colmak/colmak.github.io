const moonFragmentShader = `
  uniform sampler2D moonTexture;
  uniform sampler2D normalMap;
  uniform float phase;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Sample the moon texture
    vec4 texColor = texture2D(moonTexture, vUv);
    
    // Calculate lighting direction based on phase
    // Phase 0 = new moon, 0.5 = full moon, 1 = new moon again
    float angle = phase * 2.0 * 3.14159;
    vec3 lightDir = normalize(vec3(cos(angle), 0.0, sin(angle)));
    
    // Use normal map to add surface details
    vec3 normalMapValue = texture2D(normalMap, vUv).rgb * 2.0 - 1.0;
    vec3 normal = normalize(vNormal + normalMapValue * 0.3);
    
    // Basic diffuse lighting calculation for the illuminated side
    float diffuse = max(0.0, dot(normal, lightDir));
    
    // Add ambient light to prevent the dark side from being completely black
    float ambient = 0.1;
    
    // Combine diffuse and ambient for final lighting
    float lighting = diffuse + ambient;
    
    // Add a slight blue tint to simulate earthshine on the dark side
    vec3 earthshineColor = vec3(0.1, 0.1, 0.3);
    float earthshine = (1.0 - diffuse) * 0.2;
    
    // Combine everything for the final color
    vec3 finalColor = texColor.rgb * lighting + earthshine * earthshineColor;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default moonFragmentShader;
