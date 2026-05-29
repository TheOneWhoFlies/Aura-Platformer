// creates usable functions for a whole character automatically
export function assembleAnimations(scene,cacheKey) {
    const animationData = scene.cache.json.get(cacheKey);

    if (!animationData || !animationData.anims) {
        console.error(`JSON key "${cacheKey}" not found or improperly structured.`);
        return;
    }
    
    Object.keys(animationData.anims).forEach(character => {
        animationData.anims[character].forEach(animConfig=> {
            // gets the animation length from animation config and generates the array automaticall
            const generatedFrames = scene.anims.generateFrameNumbers(animConfig.textureKey, {
                start: animConfig.animLength.start,
                end: animConfig.animLength.end,
            })
            scene.anims.create({
                key:animConfig.key,
                frames:generatedFrames,
                frameRate: animConfig.frameRate,
                repeat: animConfig.repeat
            })
        })
    })
 }