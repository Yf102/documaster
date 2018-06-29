<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 29/06/2018
 * Time: 11:33
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/app")
 * Class AppController
 * @package App\Controller
 */
class AppController extends Controller implements TokenAuthenticatedController
{
	/**
	 * @Route("/", name="app_main")
	 */
	public function index() {
		return $this->render('app/index.html.twig', array(
			"props" => array(),
		));
	}
}
