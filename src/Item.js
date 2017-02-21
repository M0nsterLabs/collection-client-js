export default class Item {
	constructor(id, name, desc) {
		this.id = id;
		this.name = name || "";
		this.desc = desc || "";
	}
}
