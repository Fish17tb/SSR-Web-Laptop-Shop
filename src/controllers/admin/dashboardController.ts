import { Request, Response } from "express";
import { getInfoDashboard } from "services/admin/dashboardService";

const getDashboardPage = async (req: Request, res: Response) => {
  const info = await getInfoDashboard();
  
  return res.render("admin/dashboard/dashboard.ejs", { info });
};

export { getDashboardPage };
