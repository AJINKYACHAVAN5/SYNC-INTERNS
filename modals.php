<div class="modal fade" id="modalRemoveStudentSubjectTeacher" tabindex="-1" role="dialog" aria-labelledby="modalRemoveStudentSubjectTeacherLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<h4 class="modal-title">Are you sure you want to take this action?</h4>
		</div>
		<div class="modal-body">
			<p class="alert alert-danger">Note: This cannot be undone once you choose to take the action.</p>
		</div>
		<div class="modal-footer">
			<form id="triggerRemoveStudentSubjectTeacher" yearlevelid="">
			<input type="hidden" name="action" value="removeStudentSubjectTeacher" />
			<input type="hidden" name="yearsectionid" value="" />
			<input type="hidden" name="subjtid" value="" />
			<button type="submit" class="btn btn-primary">Yes</button>
			<button type="button" class="btn btn-danger" id="closeModal">No</button>
			</form>
		</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modalRemoveSubjectTeacher" tabindex="-1" role="dialog" aria-labelledby="modalRemoveremoveSubjectTeacherLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<h4 class="modal-title">Are you sure you want to take this action?</h4>
		</div>
		<div class="modal-body">
			<p class="alert alert-danger">Note: This cannot be undone once you choose to take the action.</p>
		</div>
		<div class="modal-footer">
			<form id="triggerRemoveSubjectTeacher">
			<input type="hidden" name="action" value="removeSubjectTeacher" />
			<input type="hidden" name="tid" value="" />
			<input type="hidden" name="subjid" value="" />
			<button type="submit" class="btn btn-primary">Yes</button>
			<button type="button" class="btn btn-danger" id="closeModal">No</button>
			</form>
		</div>
		</div>
	</div>
</div>
<div class="modal fade" id="modalDeleteTeacher" tabindex="-1" role="dialog" aria-labelledby="modalDeleteTeacherLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<h4 class="modal-title">Are you sure you want to take this action?</h4>
		</div>
		<div class="modal-body">
			<p class="alert alert-danger">Note: This cannot be undone once you choose to take the action.</p>
		</div>
		<div class="modal-footer">
			<form id="triggerDeleteTeacher">
			<input type="hidden" name="action" value="deleteTeacher" />
			<input type="hidden" name="tid" value="" />
			<button type="submit" class="btn btn-primary">Yes</button>
			<button type="button" class="btn btn-danger" id="closeModal">No</button>
			</form>
		</div>
		</div>
	</div>
</div>

