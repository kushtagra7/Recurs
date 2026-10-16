/*
    isExtensionEnvironment checks 
    if the extension runtime id exists
    then we are inside the extension
    else we are in the normal website
        
*/
export function isExtensionEnvironment(){
    return Boolean(
        globalThis.chrome?.runtime?.id || 
        globalThis.browser?.runtime?.id
    );
}