const decimalToBinaryInput = document.getElementById("binaryInput");

const decimalToBinaryExplain = document.getElementById("decimalToBinaryExplain");
const fractionalToBinaryExplain = document.getElementById("fractionalToBinaryExplain");

const decimalToBinaryMessage = document.getElementById("decimalToBinaryMessage");
const fractionalToBinaryMessage = document.getElementById("fractionalToBinaryMessage");

const generateDecimalExplainForDecimal = (decimal) => {
    let explain = "";
    let binary = "";
    let i = 0;
    explain += `${decimal} \t2\n`;
    while (decimal != 1) {
        explain += "\t".repeat(i);
        binary += (decimal % 2 == 0) ? "0" : "1";
        decimal = Math.trunc(decimal / 2);
        explain += `${ binary[ binary.length - 1 ] }\t${decimal}\t${ decimal != 1 ? "2" : "" }\n`;
        i++;
    }
    binary = "1" + binary.split("").reverse().join("");

    decimalToBinaryExplain.value = explain;
    decimalToBinaryMessage.textContent = binary;
}

const generateFractionalExplainForDecimal = (fractional = 0) => {
    let explain = "";
    let binary = "";
    let i = 0;
    
    while (fractional != 0) {
        explain += `${ fractional } * 2 = ${ fractional * 2 }\n`;
        fractional = fractional * 2;

        if (fractional >= 1) {
            fractional = getOnlyFractionalPart(fractional);
            binary += "1";
        }
        else {
            binary += "0";
        }

        i++;
        if (i > 50 || fractional == 1) {
            break;
        }
    }
    fractionalToBinaryExplain.value = explain;
    fractionalToBinaryMessage.textContent = binary;
}

const getOnlyFractionalPart = (n) => {
    if (Number.isInteger(n)) {
        return 0;
    }
    return Number("0" + String(n).substring(String(n).lastIndexOf("."), String(n).length));
};

const destructureNumber = (value) => {
    value = Number(value)
    const decimal = Math.trunc(value);
    const fractional = getOnlyFractionalPart(value);

    return {
        decimal,
        fractional
    }
}

const decimalToBinary = (value = "") => {
    if (value == 0) {
        decimalToBinaryExplain.value = "0";
        decimalToBinaryMessage.textContent = "0";

        fractionalToBinaryExplain.value = ""
        fractionalToBinaryMessage.textContent = ""
        return;
    }
    if ( isNaN(value) ) {
        return;
    }

    const { decimal, fractional } = destructureNumber( value );

    generateDecimalExplainForDecimal(decimal);
    if (fractional > 0) {
        generateFractionalExplainForDecimal(fractional);
    }
    else {
        fractionalToBinaryExplain.value = "";
        fractionalToBinaryMessage.textContent = ""
    }
}

decimalToBinaryInput.addEventListener("keyup", ({target}) => {
    decimalToBinary(target.value);
});

const binaryToDecimalInput = document.getElementById("binaryToDecimalInput");

const binaryToDecimalExplain = document.getElementById("binaryToDecimalExplain");
const binaryToDecimalMessage = document.getElementById("binaryToDecimalMessage");

const generateDecimalExplainForBinary = (value) => {
    let message = " ";
    const elements = String(value).split("");

    let dotLocation = elements.findIndex(e => e.includes("."));
    dotLocation = dotLocation == -1 ? elements.length : dotLocation;

    message =`${ elements.join("") } = `;
    elements.splice(dotLocation, 1);

    elements.forEach((e, index) => {
        dotLocation = dotLocation - 1;
        elements[index] = { value: e, dotLocation};
    });
    console.log(elements);

    elements.forEach(({value, dotLocation}, index) => {
        message += `${ value } * 2^${ dotLocation }${ index != elements.length -1 ? " + " : "\n" }`;
    });

    elements.forEach(({value, dotLocation}, index) => {
        message += `${ value * ( 2 ** dotLocation ) }${ index != elements.length -1 ? " + " : "" }`;
    })

    const lineNumber = message.split('\n');
    const result = eval(lineNumber[1]);
    message += ` = ${ result }`;

    binaryToDecimalExplain.value = message;
    binaryToDecimalMessage.textContent = result 
}

const binaryToDecimal = (value = 0) => {
    if (value == 0) {
        binaryToDecimalExplain.value = "0";
        binaryToDecimalMessage.textContent = "0";
        return;
    }
    if ( isNaN(value) ) {
        return;
    }

    generateDecimalExplainForBinary( value );
}

binaryToDecimalInput.addEventListener("keyup", ({target}) => {
    binaryToDecimal(target.value);
})