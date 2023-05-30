export class Pokemon{
    #name;
    #img;
    #height;
    #weight;
    #types;
    #stats;
    constructor(name, img, height, weight, types, stats){
        this.#name = name;
        this.#img = img;
        this.#height = height;
        this.#weight = weight;
        this.#types = types; 
        this.#stats = stats;     
    }

    get name(){
        return this.#name;
    }

    get img(){
        return this.#img;
    }

    get height(){
        return this.#height;
    }

    get weight(){
        return this.#weight;
    }

    get types(){
        return this.#types;
    }

    get stats(){
        return this.#stats;
    }
}