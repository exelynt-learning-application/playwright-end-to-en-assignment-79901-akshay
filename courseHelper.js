/*
The addCourse helper keeps repeated course-creation steps
in one place, while descriptive test names and individual
course details make each test's purpose clear.

The helper would hide intent if it used hardcoded values,
generic names, or included too many unrelated actions.
*/
export async function addCourse(page, course) {
  await page.goto('/admin/courses');

  await page.getByRole('button', { name: 'Add Course' }).click();
  await page.getByLabel('Title').fill(course.title);
  await page.getByLabel('Description').fill(course.description);
  await page.getByLabel('Price').fill(String(course.price));

  await page.getByRole('button', { name: 'Save' }).click();
}
import { test, expect } from '@playwright/test';
import { addCourse } from '../utils/courseHelper.js';

test('Admin can create a free course', async ({ page }) => {
  await addCourse(page, {
    title: 'Free JavaScript',
    description: 'Learn JavaScript',
    price: 0
  });

  await expect(page.getByText('Free JavaScript')).toBeVisible();
});

test('Admin can create a paid course', async ({ page }) => {
  await addCourse(page, {
    title: 'Advanced Python',
    description: 'Learn Python',
    price: 999
  });

  await expect(page.getByText('Advanced Python')).toBeVisible();
});

test('Admin can create a beginner course', async ({ page }) => {
  await addCourse(page, {
    title: 'HTML Basics',
    description: 'Learn HTML',
    price: 199
  });

  await expect(page.getByText('HTML Basics')).toBeVisible();
});

test('Admin can create an advanced course', async ({ page }) => {
  await addCourse(page, {
    title: 'React Advanced',
    description: 'Learn React',
    price: 1499
  });

  await expect(page.getByText('React Advanced')).toBeVisible();
});

test('Admin can create a database course', async ({ page }) => {
  await addCourse(page, {
    title: 'SQL Fundamentals',
    description: 'Learn SQL',
    price: 499
  });

  await expect(page.getByText('SQL Fundamentals')).toBeVisible();
});
project/
├── tests/
│   └── course.spec.js
└── utils/
    └── courseHelper.js
