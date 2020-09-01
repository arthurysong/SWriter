1. Scss: Use &:hover to add hover to a selector

2. debounce from lodash => ensures that the actual onChange event callback is called only when the user has stopped inputting the character for 300 ms!!

3. How to expose methods from child component to parent component.
IN Parent:    const childRef = useRef();
Pass down to child: <Child ref={childRef}/>
Expose in Child: useImperativeHandle(ref, () => ({ 
    exposed_method() {
        console.log("hi");
    }
}))
Now in parent you can access: childRef.current.exposed_method
