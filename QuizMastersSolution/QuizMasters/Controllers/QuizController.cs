using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuizMasters.Controllers
{
    public class QuizController : Controller
    {
        public ActionResult Index() 
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }
    }
}
