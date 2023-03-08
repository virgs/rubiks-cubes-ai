type NeuralNetworkConfig = {
    inputs: number,
    hiddenNeurons: number,
    outputs: number,
    bias?: number
};

export class NeuralNetwork {
    private readonly weights: number[];
    private readonly config: NeuralNetworkConfig;

    public constructor(config: NeuralNetworkConfig, weights?: number[]) {
        this.config = config;

        if (weights) {
            this.weights = weights;
        } else {
            let totalExtremeNodes = this.config.inputs + this.config.outputs;
            if (this.config.bias !== undefined) {
                totalExtremeNodes += 1;
            }
            const weightsAmount = totalExtremeNodes * this.config.hiddenNeurons;
            this.weights = Array.from(Array(weightsAmount)).map(() => Math.random() * 2 - 1);
        }
    }

    public getWeights(): number[] {
        return this.weights;
    }

    public doTheMagic(inputValues: number[]): number[] {
        if (inputValues.length !== this.config.inputs) {
            throw new Error(`Amount of function argument '${inputValues.length}' should match configuration inputs quantity '${this.config.inputs}'`);
        }
        const inputPlusBias = [...inputValues, this.config.bias];

        const middleLayer = NeuralNetwork.processLayer(inputPlusBias,
            this.weights
                .filter((_, index) => index >= 0 && index < this.config.inputs * this.config.hiddenNeurons),
            this.config.hiddenNeurons);
        return NeuralNetwork.processLayer(middleLayer,
            this.weights
                .filter((_, index) => index >= this.config.inputs * this.config.hiddenNeurons),
            this.config.outputs);
    }

    private static processLayer(inputLayerValues: number[], weights: number[], outputs: number): number[] {
        const zeroedOutputs = Array.from(Array(outputs)).map(() => 0);
        return weights.reduce((acc, weight, index) => {
            acc[index % outputs] += weight * inputLayerValues[index % inputLayerValues.length];
            return acc;
        }, zeroedOutputs)
            .map(outputValue => Math.tanh(outputValue));
    }
}