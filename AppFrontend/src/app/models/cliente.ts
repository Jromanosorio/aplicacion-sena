export class Cliente {
    _id: any;
    clientcode: Number;
    name: string;
    profession: string;
    address: string;

    constructor(_id = 0, clientcode = 0, name = "", profession = "", address = ""){
        this._id = _id;
        this.clientcode = clientcode;
        this.name = name;
        this.profession = profession;
        this.address = address;
    }
}
