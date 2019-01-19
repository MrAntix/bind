import { bind } from './bind';

describe('bind', () => {
  it('binds attributes', () => {
    document.documentElement.innerHTML = '<div bind [inner-html]="html"></div>';

    const context = {
      html: '<span>inserted</span>'
    };

    bind(document, context);

    const el = document.querySelector<HTMLElement>('[bind]');

    expect(el.innerHTML).toEqual(context.html);
  });

  it('binds events', async () => {
    document.documentElement.innerHTML = '<div bind {click}="onClick"></div>';

    let recievedEvent: Event;
    const context = {
      onClick: (e: Event) => (recievedEvent = e)
    };

    bind(document, context);

    const el = document.querySelector<HTMLElement>('[bind]');
    await el.click();

    expect(recievedEvent).not.toBeUndefined();
  });

  it('this is bound to element in getters', async () => {
    document.documentElement.innerHTML = '<div bind [inner-html]="html"></div>';

    const el = document.querySelector<HTMLElement>('[bind]');
    let elThis: HTMLElement;

    const context = {
      get html() {
        elThis = this;
        return '<span>inserted</span>';
      }
    };

    bind(document, context);

    expect(el.innerHTML).toEqual(context.html);
    expect(elThis).toBe(el);
  });

  it('this is bound to element in event handlers', async () => {
    document.documentElement.innerHTML = '<div bind {click}="onClick"></div>';

    const el = document.querySelector<HTMLElement>('[bind]');
    let elThis: HTMLElement;

    const context = {
      onClick: function() {
        elThis = this;
      }
    };

    bind(document, context);

    await el.click();

    expect(elThis).toBe(el);
  });
});
