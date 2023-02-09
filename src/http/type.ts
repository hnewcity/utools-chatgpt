interface RequestParams {
    prompt: string;
    model?: string;
    max_tokens?: number;
    temperature?: number;
    stop?: string[];
    top_p?: number;
    n?: number;
}

export class OpenAiParams implements RequestParams {
    prompt: string;
    model?: string | undefined;
    max_tokens?: number | undefined;
    temperature?: number | undefined;
    stop?: string[] | undefined;
    top_p?: number | undefined;
    n?: number | undefined;
    constructor({ prompt, model = "text-davinci-003", max_tokens = 1024, temperature = 0.9, stop = ["#"], top_p = 1, n = 1 }: RequestParams) {
        this.prompt = prompt;
        this.model = model;
        this.max_tokens = max_tokens;
        this.temperature = temperature;
        this.stop = stop;
        this.top_p = top_p;
        this.n = n;
    }
}

export class CodeParams extends OpenAiParams {
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    constructor({ prompt, model = "text-davinci-003", max_tokens = 1024, temperature = 0.9, stop = ["#"], top_p = 1, n = 1, frequency_penalty = 0, presence_penalty = 0 }: RequestParams & { frequency_penalty?: number, presence_penalty?: number }) {
        {
            super({ prompt, model, max_tokens, temperature, stop, top_p, n });
            this.frequency_penalty = frequency_penalty;
            this.presence_penalty = presence_penalty
        }
    }
}