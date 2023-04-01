type NeuralNetworkConfig = {
    inputs: number,
    hiddenNeurons: number[],
    outputs: number,
    activationFunction?: (input: number) => number
};

const reLU = (input: number): number => Math.max(input, 0)

export class NeuralNetwork {
    private readonly weights: number[][];
    private readonly config: NeuralNetworkConfig;

    public constructor(config: NeuralNetworkConfig, weights?: number[][]) {
        this.config = config;
        if (!this.config.activationFunction) {
            // this.config.activationFunction = Math.tanh;
            this.config.activationFunction = reLU;
        }

        if (weights) {
            this.weights = weights;
        } else {
            if (this.config.hiddenNeurons.length <= 0 || this.config.hiddenNeurons
                .some(neuronsNumber => neuronsNumber <= 0)) {
                throw new Error(`Number of hidden layers have to be greater than zeo '${config.hiddenNeurons.length}' and each layer has to have more than zero neurons '${this.config.hiddenNeurons}'`);
            }
            this.weights = NeuralNetwork.initializeWeights(this.config.inputs, this.config.hiddenNeurons.concat(this.config.outputs));
        }
    }

    public getWeights(): number[][] {
        return this.weights;
    }

    public propagateForward(inputValues: number[]): number[] {
        if (inputValues.length !== this.config.inputs) {
            throw new Error(`Amount of function argument '${inputValues.length}' should match configuration inputs quantity '${this.config.inputs}'`);
        }
        const output = this.processHiddenLayers(inputValues, 0);
        return NeuralNetwork
            .normalize(output
                .map(value => this.config.activationFunction!(value)));
    }

    private processHiddenLayers(input: number[], hiddenLayerIndex: number): number[] {
        const layer = NeuralNetwork
            .processLayer(input, this.weights[hiddenLayerIndex])
            .map(outputValue => this.config.activationFunction!(outputValue));
        if (hiddenLayerIndex < this.config.hiddenNeurons.length) {
            return this.processHiddenLayers(layer, hiddenLayerIndex + 1);
        } else {
            return layer;
        }
    }

    private static processLayer(input: number[], weights: number[]): number[] {
        const inputPlusBias = input.concat(1);
        const outputs = weights.length / inputPlusBias.length;
        const zeroedOutputs = Array.from(Array(outputs)).map(() => 0);
        return weights
            .reduce((acc, weight, index) => {
                acc[index % outputs] += weight * inputPlusBias[index % inputPlusBias.length];
                return acc;
            }, zeroedOutputs);
    }

    private static normalize(values: number[]): number[] {
        const sum = values.reduce((sum, item) => sum + item, 0);
        return values.map(item => item / sum);
    }

    private static initializeWeights(inputs: number, layers: number[]) {
        const bias = 1;
        const numberOfWeights = [(inputs + bias) * layers[0]];
        for (let layer = 0; layer < layers.length - 1; ++layer) {
            numberOfWeights.push((layers[layer] + bias) * layers[layer + 1]);
        }
        return numberOfWeights
            .reduce((acc, numberOfNeuronsInThisLayer) => {
                const neuronsOfLayer: number[] = Array
                    .from(Array(numberOfNeuronsInThisLayer))
                    .map(() => Math.random() * 2 - 1);
                acc.push(neuronsOfLayer);
                return acc;
            }, [] as number[][]);
    }

}