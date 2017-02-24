/** global: Response */
require('bluebird');
require('isomorphic-fetch');

import {assert} from "chai";
import sinon from 'sinon';
import Collections from "../src/index";
import Collection from "../src/Collection";
import Item from "../src/Item";
import Ajax from "../src/Ajax";


describe("sample", function () {
	beforeEach(function () {
		this.api = new Collections('http://collection1.dev/v1');

		this.willReturnResponse = function (data) {
			this.ajax = sinon.createStubInstance(Ajax);
			this.api.ajax = this.ajax;

			const response = new Response(JSON.stringify(data));
			this.ajax.request.returns(Promise.resolve(response));
		}
	});


	it('returns public collections', function () {
		this.willReturnResponse([
			{"id": "acceptancetestid", "user_id": null, "name": "Acceptance test collection", "max_items": 0, "_links": {"self": {"href": "http://collection-api.dev/v1/collections/acceptancetestid"}}},
			{"id": "test", "user_id": null, "name": "Sample collection", "max_items": 0, "_links": {"self": {"href": "http://collection-api.dev/v1/collections/acceptancetestid"}}}
		]);

		return this.api.getPublicCollections().then(function (data) {
			assert.deepEqual(data, [
				new Collection("acceptancetestid", "Acceptance test collection"),
				new Collection('test', 'Sample collection')]);
		})
	});

	it('returns collection items', function () {
		this.willReturnResponse([{"id":1,"collection_id":"acceptancetestid","item_name":"test item 1","description":null,"created_at":null,"updated_at":null,"_links":{"self":{"href":"http://collection-api.dev/v1/items/1"}}},
			{"id":2,"collection_id":"acceptancetestid","item_name":"test item 2","description":null,"created_at":null,"updated_at":null,"_links":{"self":{"href":"http://collection-api.dev/v1/items/2"}}}]);

		return this.api.getCollectionItems('acceptancetestid').then(function (data) {
			assert.deepEqual(data, [
				new Item(1, 'test item 1'),
				new Item(2, 'test item 2'),
			])
		})
	});
});
