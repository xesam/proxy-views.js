const { AliasView } = require('../index');
const { createOriginObj, createOriginArray } = require('./utils');

describe('AliasView#alias', () => {
    it('the value of proxy view is same as origin', () => {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        expect(view.name).toBe('origin name');
        expect(view.title).toBeUndefined();

        expect(view.address).toStrictEqual(origin.address);
    });
    it("proxy view can access a same origin's attr with alias [1]", () => {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('name', ['alias_name', 'alias_name2', 'alias_name3']);

        expect(origin.title).toBeUndefined();
        expect(view.alias_name).toBe('origin name');
        expect(origin.alias_name2).toBeUndefined();
        expect(view.alias_name2).toBe('origin name');
        expect(origin.alias_name3).toBeUndefined();
        expect(view.alias_name3).toBe('origin name');
    });
    it("proxy view can access a same origin's attr with alias [2]", () => {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('name', 'alias_name', 'alias_name2', 'alias_name3');

        expect(origin.title).toBeUndefined();
        expect(view.alias_name).toBe('origin name');
        expect(origin.alias_name2).toBeUndefined();
        expect(view.alias_name2).toBe('origin name');
        expect(origin.alias_name3).toBeUndefined();
        expect(view.alias_name3).toBe('origin name');
    });
    it("proxy view can access a same origin's attr with alias [3]", () => {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('name', ['alias_name', 'alias_name2'], 'alias_name3');

        expect(origin.title).toBeUndefined();
        expect(view.alias_name).toBe('origin name');
        expect(origin.alias_name2).toBeUndefined();
        expect(view.alias_name2).toBe('origin name');
        expect(origin.alias_name3).toBeUndefined();
        expect(view.alias_name3).toBe('origin name');
    });
    it('config alias with array', () => {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias(['address', 'city', 'id'], ['cityId']);

        expect(view.cityId).toBe('001');
        expect(origin.cityId).toBeUndefined();
    });
    it('config alias with string', () => {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('address.city.id', ['cityId']);

        expect(view.cityId).toBe('001');
        expect(origin.cityId).toBeUndefined();
    });
    it("change value of the origin' attr", () => {
        const origin = {
            name: 'origin name'
        };
        const view = new AliasView(origin);

        origin.name = 'new name';
        expect(view.name).toBe('new name');

        view.alias('name', ['title']);
        expect(view.title).toBe('new name');
    });
    it("change value of the proxy-view' attr", () => {
        const origin = {
            name: 'origin name'
        };
        const view = new AliasView(origin);

        view.name = 'new name';

        expect(origin.name).toBe('new name');
        expect(view.name).toBe('new name');
    });
    it("change value of the proxy-view' alias attr", () => {
        const origin = {
            name: 'origin name'
        };
        const view = new AliasView(origin);

        view.alias('name', ['title']);
        view.title = 'new name';

        expect(origin.name).toBe('new name');
        expect(view.name).toBe('new name');
        expect(origin.title).toBeUndefined();
        expect(view.title).toBe('new name');
    });
    it('add new attr to proxy-view', () => {
        const origin = {
            name: 'origin name'
        };
        const view = new AliasView(origin);

        view.newattr = 'the new attr value';
        expect(origin.newattr).toBe('the new attr value');
        expect(view.newattr).toBe('the new attr value');
    });
});

describe('AliasView#toJSON', () => {
    it('toJSON()', function () {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('name', 'alias_name');

        expect(JSON.stringify(view.toJSON())).toStrictEqual(
            JSON.stringify({
                ...origin,
                alias_name: 'origin name'
            })
        );
    });
    it('toJSON({target:true, alias:false})', function () {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('name', 'alias_name');

        expect(JSON.stringify(view.toJSON({ target: true }))).toStrictEqual(JSON.stringify(origin));
    });
    it('toJSON({target:false, alias:true})', function () {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('name', 'alias_name');

        expect(JSON.stringify(view.toJSON({ alias: true }))).toStrictEqual(
            JSON.stringify({
                alias_name: 'origin name'
            })
        );
    });
    it('toJSON({target:false, alias:false})', function () {
        const origin = createOriginObj();
        const view = new AliasView(origin);

        view.alias('name', 'alias_name');

        expect(JSON.stringify(view.toJSON({ target: false, alias: false }))).toStrictEqual(JSON.stringify({}));
    });
});

describe('AliasView#nest', () => {
    it('[access] should be able to nest', function () {
        const origin = createOriginObj();
        const view = new AliasView(origin);
        const view2 = new AliasView(view);

        expect(origin.name).toBe('origin name');
        expect(view.name).toBe('origin name');
        expect(view2.name).toBe('origin name');
    });

    it('[set] should be able to nest', function () {
        const origin = createOriginObj();
        const view = new AliasView(origin);
        const view2 = new AliasView(view);

        view2.name = 'new name';

        expect(origin.name).toBe('new name');
        expect(view.name).toBe('new name');
        expect(view2.name).toBe('new name');
    });

    it('[set] should be able to nest', function () {
        const origin = createOriginObj();
        const view = new AliasView(origin);
        const view2 = new AliasView(view);

        view2.newattr = 'the new attr value';

        expect(origin.newattr).toBe('the new attr value');
        expect(view.newattr).toBe('the new attr value');
        expect(view2.newattr).toBe('the new attr value');
    });
});

describe('AliasView#array', () => {
    it("[1] alias array' index", function () {
        const origin = createOriginArray();
        const view = new AliasView(origin);

        view.alias(0, 'first');

        expect(origin[0].name).toBe('John');
        expect(view.first).toBe(origin[0]);
    });
    it("[2] alias array' index", function () {
        const origin = createOriginArray();
        const view = new AliasView(origin);

        view.alias(100, 'empty');

        expect(origin[100]).toBeUndefined();
        expect(view.empty).toBeUndefined();
    });
});
