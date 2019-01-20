import { bind } from './bind';

describe('bind', () => {
  it('binds attributes', () => {
    document.documentElement.innerHTML = `
      <div bind [inner-html]="html"></div>
      <div bind [inner-html]="html"></div>
    `;

    const context = {
      html: '<span>inserted</span>'
    };

    bind(document, context);

    const els = document.querySelectorAll<HTMLElement>('[bind]');

    expect(els[0].innerHTML).toEqual(context.html);
    expect(els[1].innerHTML).toEqual(context.html);

    const update ='<span>updated</span>';
    context.html = update;

    expect(els[0].innerHTML).toEqual(update);
    expect(els[1].innerHTML).toEqual(update);
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

  it('this is bound to element in function properties', async () => {
    document.documentElement.innerHTML = `
      <div data-id="one" bind [inner-html]="html"></div>
      <div data-id="two" bind [inner-html]="html"></div>
    `;

    const els = document.querySelectorAll<HTMLElement>('[bind]');

    const context = {
      html() {
        return `<span>inserted ${this.dataset.id}</span>`;
      }
    };

    bind(document, context);

    expect(els[0].innerHTML).toEqual('<span>inserted one</span>');
    expect(els[1].innerHTML).toEqual('<span>inserted two</span>');

    els[0].dataset.id = 'three';
    context.html();

    expect(els[0].innerHTML).toEqual('<span>inserted three</span>');
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
