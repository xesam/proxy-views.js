const { StrictView } = require('..');
const { createOriginObj, createOriginArray } = require('./utils');

describe('StrictView', () => {
    it('[1] the attr-value of view should be the same as the origin object', () => {
        const origin = createOriginObj();
        const view = new StrictView(origin, () => {
            return 'default value';
        });

        expect(origin.name).toBe('origin name');
        expect(view.name).toBe('origin name');
    });
    it('[2] the attr-value of view should be the same as the origin object', () => {
        const origin = createOriginObj();
        const view = new StrictView(origin, () => {
            return 'default value';
        });

        origin.name = 'new name';

        expect(origin.name).toBe('new name');
        expect(view.name).toBe('new name');
    });
    it('when access a property that is not defined in origin object then it throws an error', () => {
        const origin = createOriginObj();
        const view = new StrictView(origin);

        expect(() => {
            return view.missingName;
        }).toThrowError('Property "missingName" is not defined in origin object');
    });
    it('when set a property that is not defined in origin object then it throws an error', () => {
        const origin = createOriginObj();
        const view = new StrictView(origin);

        expect(() => {
            view.missingName = 'new name';
        }).toThrowError('Property "missingName" is not defined in origin object');
    });
    it('when access a index that is not defined in origin array then it throws an error', () => {
        const origin = createOriginArray();
        const view = new StrictView(origin);

        expect(origin[0].name).toBe('John');
        expect(view[0].name).toBe('John');
        expect(origin[100]).toBeUndefined();
        expect(() => {
            return view[100];
        }).toThrowError('Property "100" is not defined in origin object');
    });
    it('when set a index that is not defined in origin array then it throws an error', () => {
        const origin = createOriginArray();
        const view = new StrictView(origin);

        origin[0].name = 'lan';

        expect(origin[0].name).toBe('lan');
        expect(view[0].name).toBe('lan');

        origin[100] = { name: 'lan', friends: [] };
        
        expect(() => {
            view[101] = { name: 'lan', friends: [] };
        }).toThrowError('Property "101" is not defined in origin object');
    });
});
