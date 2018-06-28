<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 28/06/2018
 * Time: 16:27
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class SecurityController extends Controller
{

	/**
	 * @Route("/login", name="login")
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function login(Request $request)
	{
		$username = $request->get("_usernamer");
		$password = $request->get("_password");


		// get the login error if there is one
		$error = null;

		// last username entered by the user
		$lastUsername = $username;

		return $this->render('security/login.html.twig', array(
			"props" => array(
				'last_username' => $lastUsername,
				'error' => $error
			),
		));
	}
}
