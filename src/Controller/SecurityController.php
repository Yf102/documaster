<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 28/06/2018
 * Time: 16:27
 */

namespace App\Controller;

use Documaster\UsersQuery;
use Httpful\Httpful;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class SecurityController extends Controller
{
	/**
	 * @Route("/login", name="login")
	 * @param Request $request
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
	 * @throws \Httpful\Exception\ConnectionErrorException
	 */
	public function login(Request $request)
	{
		$username = $request->get("_username");
		$password = $request->get("_password");

		$error = null;
		$lastUsername = $username;

		if($request->isMethod("POST")) {
			$user = UsersQuery::create()->findOneByUserEmail($username);
			if(empty($user)) {
				// TODO: Server Log
				$error = "No such user";
			} else if($password !== $user->getUserPass()) {
				// TODO: Server Log
				$error = "Email or password is wrong";
			} else {
				// start session for user
				$_SESSION['user_mail'] = $username;
				$_SESSION['user_id'] = $user->getId();
				$_SESSION["user_token"] = $this->createToken();

				return $this->redirectToRoute('app_main');
			}
		}

		return $this->render('security/login.html.twig', array(
			"props" => array(
				'last_username' => $lastUsername,
				'error' => $error
			),
		));
	}

	/**
	 * @throws \Httpful\Exception\ConnectionErrorException
	 */
	private function createToken() {
		$params = array(
			"realUserId" => "1",
			"effectiveUserId" => "1",
			"name" => "John Doe",
			"roles" => array("admin"),
			"accessCodes" => array(),
			"accessCodesGrant" => array()
		);

		$resp = \Httpful\Request::post("http://206.189.10.120:8083/dots/v1/create-token")
			->contentType("application/json")
			->addHeader("Accept", "text/plain")
			->body($params)
			->send();

		return $resp->body;
	}


	/**
	 * @Route("/logout", name="logout")
	 * @return \Symfony\Component\HttpFoundation\RedirectResponse
	 */
	public function logout() {
		session_unset();
		return $this->redirectToRoute('login');
	}
}
