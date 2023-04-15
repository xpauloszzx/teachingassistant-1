
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='alunos']").click();
    })

    Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        await allcpfs;
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs;
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^I try to register the student "([^\"]*)" with CPF "(\d*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^I try to remove the student with CPF "(\d*)"$/, async (cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs.first().element(by.buttonText('Remover')).click();
    });

    Then(/^I cannot see the student with CPF "(\d*)" in the students list$/, async (cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Given(/^I am at the self-evaluation page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect


Given(/^I am at the self-evaluation page$/, async () => {
  await browser.get("http://localhost:4200/");
  await expect(browser.getTitle()).to.eventually.equal('TaGui');
  await $("a[name='autoavaliacao']").click();
})

Given(/^I cannot see a self-evaluation with title "([^\"]*)" in the self-evaluations list$/, async (title) => {
  var allTitles : ElementArrayFinder = element.all(by.name('titlelist'));
  await allTitles;
  var sameTitles = allTitles.filter(elem =>
                                    elem.getText().then(text => text === title));
  await sameTitles;
  await sameTitles.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
});

When(/^I try to register the self-evaluation "([^\"]*)" with title "([^\"]*)"$/, async (description, title) => {
  await $("input[name='titlebox']").sendKeys(<string> title);
  await $("input[name='descriptionbox']").sendKeys(<string> description);
  await element(by.buttonText('Adicionar')).click();
});

Then(/^I can see a self-evaluation with title "([^\"]*)" in the self-evaluations list$/, async (title) => {
  var allSelfEvals : ElementArrayFinder = element.all(by.name('selfevalist'));
  allSelfEvals.filter(elem => elem.element(by.name('titlelist')).getText().then(text => text === title)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
});

















































