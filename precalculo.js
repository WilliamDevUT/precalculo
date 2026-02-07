
function calcularDominio() {
    const entrada = document.getElementById("operacion").value;
    const salida = document.getElementById('salida');
    graficar(entrada);


    if (entrada.includes("/")==false) {
    console.log("La operación no tiene fracción");
    salida.innerHTML = "⚠️ La expresión no es una fracción.";
    return;
    }

    let [numerador, denominador] = entrada.split("/");
    //remplazar los espacios
    numerador = numerador.trim();
    denominador = denominador.trim().replace("(", "").replace(")", "");
    //---
    console.log("Numerador:", numerador);
    salida.innerHTML = `Numerador: ${numerador}`;
    console.log("Denominador:", denominador);
    salida.innerHTML = "Denominador:", denominador;

    
    let a = 0, b = 0, c = 0;
    
    let limpio = "";
    let tamañoDenominador= denominador.length;
    for (let i = 0; i < tamañoDenominador; i++) {

        if (denominador[i] !== " ") {
            limpio += denominador[i];
        }
    }

    
    let terminos = [];
    let actual = limpio[0]; 
    let tamañoDenominadorLimpio =limpio.length;
    // actual es limpio 0 leugo terminos agrega actual luego actual es igual a limpio[i] (caracteres)  asi susesivamente
    for (let i = 1; i < tamañoDenominadorLimpio; i++) {

        const caracter = limpio[i];

        if (caracter === "+" || caracter === "-") {
            terminos.push(actual); 
            actual = caracter;         
        } else {
            actual += caracter;        
        }
    }
    terminos.push(actual); 
    //t = terminos
    terminos.forEach(t => {

    if (t.includes('x^2')) {
        let coef = t.replace('x^2', '');
        if (coef === '' || coef === '+') {
            a = 1;

        } else if (coef === '-') {
            a = -1;

        } else {
            a = parseFloat(coef);

        }

    } else if (t.includes('x')) {
        let coef = t.replace('x', '');
        if (coef === '' || coef === '+') {
            b = 1;
        } else if (coef === '-') {
            b = -1;
        } else {
            b = parseFloat(coef);
        }


    } else {
        c = parseFloat(t);
    }
    });

    if (a === 0) {
    salida.innerHTML ="No es una expresión cuadrática. No puedo analizar el denominador.";
    console.log("No es una expresión cuadrática. No puedo analizar el denominador.");
    return;
    }

    const discriminante = b*b - 4*a*c;

    if (discriminante < 0) {
    salida.innerHTML ="El denominador no se anula con valores reales.";
    console.log("El denominador no se anula con valores reales.");
    salida.innerHTML ="Dominio: Todos los reales.";
    console.log("Dominio: Todos los reales.");
    } else {
    const sqrtD = Math.sqrt(discriminante);
    const x1 = (-b + sqrtD) / (2*a);
    const x2 = (-b - sqrtD) / (2*a);

    if (x1 === x2) {

        console.log("El denominador se anula en:", x1);
        salida.innerHTML ="El denominador se anula en:", x1;
        console.log(`Dominio: Todos los reales excepto x = ${x1}`);
        salida.innerHTML =`Dominio: Todos los reales excepto x = ${x1}`;
    } else {
        console.log("El denominador se anula en:", x1, "y", x2);
        salida.innerHTML ="El denominador se anula en:", x1, "y", x2;
        console.log(`Dominio: Todos los reales excepto x = ${x1} y x = ${x2}`);
        salida.innerHTML =`Dominio: Todos los reales excepto x = ${x1} y x = ${x2}`;
    }
    }
}

function generarDatos(entrada) {
    let xs = [];
    let ys = [];

    for (let x = -10; x <= 10; x += 0.5) {
    let y;
    try {
        y = eval(entrada.replaceAll('x', `(${x})`));
        if (isFinite(y)) {
            xs.push(x);
            ys.push(y);
        } else {
            xs.push(x);
            ys.push(null);
        }
    } catch (e) {
        xs.push(x);
        ys.push(null);
    }
    }
    return { xs, ys };
}

function graficar(entrada) {
    const { xs, ys } = generarDatos(entrada);

    chart.data.labels = xs;
    chart.data.datasets[0].data = ys;
    chart.data.datasets[0].label = `y = ${entrada}`;

    chart.update();
}