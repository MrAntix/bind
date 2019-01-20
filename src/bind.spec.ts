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
    document.documentElement.innerHTML = `
      <div data-id="one" bind [inner-html]="html"></div>
      <div data-id="two" bind [inner-html]="html"></div>
    `;

    const els = document.querySelectorAll<HTMLElement>('[bind]');

    const context = {
      get html() {
        return `<span>inserted ${this.dataset.id}</span>`;
      }
    };

    bind(document, context);

    expect(els[0].innerHTML).toEqual('<span>inserted one</span>');
    expect(els[1].innerHTML).toEqual('<span>inserted two</span>');

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
