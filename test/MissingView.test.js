const { MissingView } = require('..');
const { createOriginObj } = require('./utils');

describe('MissingView', () => {
    it('[1] the attr-value of view should be the same as the origin object', () => {
        const origin = createOriginObj();
        const view = new MissingView(origin, () => {
            return 'default value';
        });

        expect(origin.name).toBe('origin name');
        expect(view.name).toBe('origin name');
    });
    it('[2] the attr-value of view should be the same as the origin object', () => {
        const origin = createOriginObj();
        const view = new MissingView(origin, () => {
            return 'default value';
        });

        origin.name = 'new name';

        expect(origin.name).toBe('new name');
        expect(view.name).toBe('new name');
    });
    it('when access a property that is not defined in origin object then it return the default value', () => {
        const origin = createOriginObj();
        const view = new MissingView(origin, () => {
            return 'default value';
        });

        expect(origin.missingName).toBeUndefined();
        expect(view.missingName).toBe('default value');
    });
    it('when set a property that is not defined in origin object then it do nothing', () => {
        const origin = createOriginObj();
        const view = new MissingView(origin, () => {
            return 'default value';
        });

        view.missingName = 'new missing name';
        expect(view.missingName).toBe('default value');
        expect(origin.hasOwnProperty('missingName')).toBeFalsy();
    });
});
