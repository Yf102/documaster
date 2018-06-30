<?php
/**
 * Created by PhpStorm.
 * User: filiphristov
 * Date: 30/06/2018
 * Time: 10:57
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/api")
 */
class ApiController extends Controller
{
	private $app;

	public function __construct()
	{
		$this->app = new \DocumasterApp();
	}

	/**
	 * @Route("/search", name="server_search")
	 * @throws \Httpful\Exception\ConnectionErrorException
	 */
	public function getServerSearch()
	{
		// Get searched data
		$params = array(
			"type" => "Klass",
			"sortOrder" => array(
				"classId" => "desc"
			),
			"start" => 0,
			"pageSize" => 300
		);

		$resp = \Httpful\Request::post("http://206.189.10.120:8083/dots/v1/search")
			->contentType("application/json")
			->addHeader("Accept", "application/json")
			->addHeader("Authorization", "Bearer " . $this->app->userToken())
			->body($params)
			->send();

		// If success filter data
		if($resp->code === 200) {
			// Prepare filtered object
			$filteredObj = array();
			foreach ($resp->body->results as $obj) {
				$filteredObj[$obj->object->id] = array(
					"classId" => $obj->object->classId,
					"title" => $obj->object->title,
					"refParent" => isset($obj->refs->refParent) ? $obj->refs->refParent : null,
					"children" => array()
				);
			}

			// Rearrange filtered object to contain
			// all leaf node classes grouped by their parent
			foreach ($filteredObj as $key => $filtered_obj) {
				if(is_null($filtered_obj["refParent"]) || count($filteredObj[$key]["children"]) > 0) {
					unset($filteredObj[$key]["refParent"]);
					continue;
				}

				$filteredObj[$filtered_obj["refParent"]]["children"][$key] = array(
					"classId" => $filtered_obj["classId"],
					"title" => $filtered_obj["title"]
				);
				unset($filteredObj[$key]);
			}
			return $this->json(array("status" => 200, "data" => $filteredObj));
		}

		return $this->json(array(
			"status" => $resp->code,
			"data" => $resp->body
		));
	}
}
