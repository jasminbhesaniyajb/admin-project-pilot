import { http } from "msw";
import { v4 as uuidv4 } from "uuid";

export const projects: any[] = [
  {
    id: uuidv4(),
    customer: "Acme Corp",
    referenceNumber: "REF12345",
    projectName: "Office Renovation",
    projectNumber: "PROJ-001",
    areaLocation: "Downtown",
    address: "123 Main St, Cityville",
    dueDate: "2025-05-26T18:30:00.000Z",
    contact: "John Doe",
    manager: "Alice Johnson",
    staff: "Mark Smith",
    status: "In Progress",
    email: "john.doe@acme.com",
  },
  {
    id: uuidv4(),
    customer: "Beta Ltd",
    referenceNumber: "REF67890",
    projectName: "Retail Store Setup",
    projectNumber: "PROJ-002",
    areaLocation: "Uptown",
    address: "456 Market St, Townsville",
    dueDate: "2025-05-26T18:30:00.000Z",
    contact: "Sarah Lee",
    manager: "Bob Anderson",
    staff: "Jane Doe",
    status: "Pending",
    email: "sarah.lee@beta.com",
  },
];

export const projectHandlers = [
  // GET all projects
  http.get("/api/projects", () => {
    return new Response(JSON.stringify(projects), { status: 200 });
  }),

  // POST: Create project
  http.post("/api/projects", async ({ request }) => {
    const data = await request.json();
    const newProject = { id: uuidv4(), ...data };
    projects.push(newProject);
    return new Response(JSON.stringify(newProject), { status: 201 });
  }),

  // GET project by ID
  http.get("/api/projects/:id", ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(project), { status: 200 });
  }),

  // PUT: Update project
  http.put("/api/projects/:id", async ({ params, request }) => {
    const index = projects.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }
    const updatedData = await request.json();
    projects[index] = { ...projects[index], ...updatedData };
    return new Response(JSON.stringify(projects[index]), { status: 200 });
  }),

  // DELETE: Remove project
  http.delete("/api/projects/:id", ({ params }) => {
    const index = projects.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return new Response(JSON.stringify({ message: "Project not found" }), {
        status: 404,
      });
    }
    projects.splice(index, 1);
    return new Response(null, { status: 204 });
  }),
];
