import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
    lessonsBtn: any;
    firstLesson: any;
    lessonHeader: any;

    constructor(page:Page){
        super(page)
        this.lessonsBtn = page.locator('//a[@class="dashboard-card-course-navigation__link dashboard-card-course-navigation__link--lessons"]')
        this.firstLesson = page.locator('(//a[contains(text(),1)])[1]')
        this.lessonHeader = page.locator('//h2')
   }

   async checkFirstLesson(){
        await this.lessonsBtn.click()
        await this.firstLesson.click()
        await this.page.waitForNavigation()
        await expect(this.lessonHeader).toContainText("Вітаємо на спринті")
   }
}
