//------------Creating Elements Div, Paragraph, Button, Select, Input--------

export const createDivElement = (divClass) => {
    const divElement = document.createElement("div")
    divElement.className = divClass
    return divElement;
}


export const createParagraphElement = (paraClass, paraText) => {
    const paraElement = document.createElement("p")
    paraElement.className = paraClass
    paraElement.innerHTML = paraText
    return paraElement;
}

export const createButtonElement = (buttonClass, buttonText) => {
    const buttonElement = document.createElement("button")
    buttonElement.className = buttonClass
    const btnText = document.createElement('span')
    btnText.innerText = buttonText
    buttonElement.appendChild(btnText)
    return buttonElement;
}


export const createSelectElement = (selectId, optionsArray) => {
    const selectElement = document.createElement('select');
    selectElement.id = selectId;

    for (let i = 0; i < optionsArray.length; i++) {
        let valueText = optionsArray[i].value
        let optionText = optionsArray[i].nodeText

        const option = document.createElement("option");
        option.className = "opts"
        option.value = valueText;
        option.textContent = optionText
        selectElement.appendChild(option)
    }

    return selectElement;

};

export const createNumberSelect = (selectId, noArray) => {
    const selectElement = document.createElement('select');
    selectElement.id = selectId;

    let opt = document.createElement("option");
    opt.value = ""
    opt.textContent = "--Number (1-10)--"
    selectElement.appendChild(opt)

    for (let i = 1; i <= noArray.length; i++) {
        let opt = document.createElement("option");
        opt.className = "opts"
        opt.value = `${i}`
        opt.textContent = `${i}`
        selectElement.appendChild(opt)
    }

    return selectElement;

}

export const createInputElement = (placeholder) => {
    let inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'playerInput';
    inputElement.placeholder = placeholder;
    return inputElement;
}